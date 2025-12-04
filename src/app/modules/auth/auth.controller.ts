import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { registerUser, loginUser, changePassword as changePasswordService } from './auth.service';

export const register = catchAsync(async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username, email, and password are required',
    });
  }

  const result = await registerUser(username, email, password, role);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Registration successful',
    data: result,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
    });
  }

  const result = await loginUser(username, password);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

export const verifyAuth = catchAsync(async (req: Request, res: Response) => {
  // If middleware passes, user is authenticated
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Authenticated',
    data: (req as any).user, // Set by auth middleware
  });
});

export const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const userId = (req as any).user?.id; // From auth middleware

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Current password and new password are required',
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'New password must be at least 6 characters long',
    });
  }

  const result = await changePasswordService(userId, currentPassword, newPassword);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: null,
  });
});
