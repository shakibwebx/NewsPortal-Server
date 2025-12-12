import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import config from '../../config';
import AppError from '../utils/AppError';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, config.jwt_secret);

    // Attach user to request
    (req as any).user = decoded;

    next();
  } catch (error: any) {
    console.error('Auth middleware error:', error.message);
    if (error.name === 'JsonWebTokenError') {
      next(new AppError(401, 'Invalid token'));
    } else if (error.name === 'TokenExpiredError') {
      next(new AppError(401, 'Token expired'));
    } else {
      next(new AppError(401, error.message || 'Invalid or expired token'));
    }
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get user from previous auth middleware
    const user = (req as any).user;

    if (!user) {
      throw new AppError(401, 'Authentication required');
    }

    // Check if user has admin role
    if (user.role !== 'admin') {
      throw new AppError(403, 'Access denied. Admin role required.');
    }

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError(403, 'Access denied'));
    }
  }
};
