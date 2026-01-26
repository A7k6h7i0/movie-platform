import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '30d' }
  );
};

// @desc Register new user
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    if (await User.findOne({ phone })) {
      return res.status(400).json({ success: false, message: 'User with this phone number already exists' });
    }

    const user = await User.create({ name, email, phone, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
        token
      }
    });
  } catch {
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

// @desc Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
        token
      }
    });
  } catch {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

// @desc Get current user
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, data: { user } });
};

// ===============================
// ✅ FORGOT PASSWORD (NEW)
// ===============================
// ================== EMAIL SETUP ==================
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
  
// });

// ================== FORGOT PASSWORD (EMAIL LINK) ==================
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//     await user.save();

//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     // ✅ RESPOND FIRST (THIS FIXES 502)
//     res.status(200).json({
//       success: true,
//       message: 'Password reset link sent to email'
//     });

//     // ✅ SEND EMAIL AFTER RESPONSE (NON-BLOCKING)
//     transporter.sendMail({
//       to: user.email,
//       subject: 'MovieHub Password Reset',
//       html: `
//         <p>You requested a password reset.</p>
//         <p>Click below to reset your password:</p>
//         <a href="${resetUrl}">${resetUrl}</a>
//         <p>This link expires in 15 minutes.</p>
//       `
//     }).catch(err => {
//       console.error('Email send failed:', err.message);
//     });

//   } catch (error) {
//     console.error('Forgot password error:', error);
//     if (!res.headersSent) {
//       res.status(500).json({ success: false, message: 'Server error' });
//     }
//   }
// };


// // ================== RESET PASSWORD ==================
// export const resetPassword = async (req, res) => {
//   const hashedToken = crypto
//     .createHash('sha256')
//     .update(req.params.token)
//     .digest('hex');

//   const user = await User.findOne({
//     resetPasswordToken: hashedToken,
//     resetPasswordExpire: { $gt: Date.now() }
//   });

//   if (!user) {
//     return res.status(400).json({ success: false, message: 'Invalid or expired token' });
//   }

//   user.password = req.body.password;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;
//   await user.save();

//   res.json({ success: true, message: 'Password reset successful' });
// };


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // ✅ Respond immediately
    res.status(200).json({
      success: true,
      message: 'Password reset link sent to email'
    });

    // ✅ Send email via Resend (RELIABLE)
    await resend.emails.send({
      from: 'MovieHub <onboarding@resend.dev>',
      to: user.email,
      subject: 'MovieHub Password Reset',
      html: `
        <h2>Password Reset</h2>
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 15 minutes.</p>
      `
    });

  } catch (error) {
    console.error('Forgot password error:', error.message);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
};

// ================== RESET PASSWORD ==================
export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });

  } catch (error) {
    console.error('Reset password error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};


