const jwt = require('jsonwebtoken');
import { User } from './user.model';
import AppError from '../../utils/AppError';
import config from '../../../config';

export const registerUser = async (username: string, email: string, password: string, role: 'admin' | 'editor' = 'editor') => {
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    throw new AppError(400, 'Username or email already exists');
  }

  // Validate password length
  if (password.length < 6) {
    throw new AppError(400, 'Password must be at least 6 characters long');
  }

  // Create new user
  const user = await User.create({
    username,
    email,
    password, // Will be hashed by pre-save hook
    role,
    isActive: true,
  });

  // Generate JWT token
  const payload = { id: user._id, username: user.username, role: user.role };
  const token = jwt.sign(
    payload,
    config.jwt_secret,
    { expiresIn: config.jwt_expires_in }
  );

  // Return user data without password
  const userWithoutPassword = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return { token, user: userWithoutPassword };
};

export const loginUser = async (username: string, password: string) => {
  // Find user with password field
  const user = await User.findOne({ username, isActive: true }).select('+password');

  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new AppError(401, 'Invalid credentials');
  }

  // Generate JWT token
  const payload = { id: user._id, username: user.username, role: user.role };
  const token = jwt.sign(
    payload,
    config.jwt_secret,
    { expiresIn: config.jwt_expires_in }
  );

  // Return user data without password
  const userWithoutPassword = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return { token, user: userWithoutPassword };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwt_secret);
  } catch (error) {
    throw new AppError(401, 'Invalid or expired token');
  }
};

export const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  // Find user with password field
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // Verify current password
  const isPasswordValid = await user.comparePassword(currentPassword);

  if (!isPasswordValid) {
    throw new AppError(401, 'Current password is incorrect');
  }

  // Update password (will be hashed by pre-save hook)
  user.password = newPassword;
  await user.save();

  return { message: 'Password changed successfully' };
};
