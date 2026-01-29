import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Resend } from 'resend';

// ===============================
// JWT
// ===============================
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '30d' }
  );
};

// ===============================
// REGISTER
// ===============================
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

// ===============================
// LOGIN
// ===============================
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

// ===============================
// GET ME
// ===============================
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, data: { user } });
};

// ===============================
// ✅ RESEND EMAIL SETUP (RENDER SAFE)
// ===============================
const resend = new Resend(process.env.RESEND_API_KEY);

// ===============================
// FORGOT PASSWORD
// ===============================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // ✅ Respond immediately
    res.status(200).json({
      success: true,
      message: 'Password reset link sent to email'
    });

    // ✅ Send email via Resend (HTTP, not SMTP)
    await resend.emails.send({
      from: 'MovieHub <onboarding@resend.dev>',
      to: user.email,
      subject: 'MovieHub Password Reset',
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 15 minutes.</p>
      `
    });

  } catch (error) {
    console.error('Forgot password error:', error);
  }
};

// ===============================
// RESET PASSWORD
// ===============================
export const resetPassword = async (req, res) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid or expired token' });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ success: true, message: 'Password reset successful' });
};
