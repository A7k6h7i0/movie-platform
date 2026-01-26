import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const tempPassword = crypto.randomBytes(4).toString('hex');
  user.password = tempPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Temporary password generated successfully',
    tempPassword // ⚠️ For demo/testing (email can be added later)
  });
};
