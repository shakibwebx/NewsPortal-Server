import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import AppError from '../utils/AppError';

export const validate = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue: any) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errorMessages,
        });
      }
      next(new AppError(400, 'Invalid request data'));
    }
  };
};
