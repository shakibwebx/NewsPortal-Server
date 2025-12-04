import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import config from '../../config';

interface IErrorResponse {
  statusCode: number;
  message: string;
  errorMessages?: Array<{
    path: string;
    message: string;
  }>;
  stack?: string;
}

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorMessages: Array<{ path: string; message: string }> = [];

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errorMessages = Object.values(err.errors).map((val: any) => ({
      path: val.path,
      message: val.message,
    }));
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate key error';
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    errorMessages = [
      {
        path: '',
        message: `${extractedMessage} already exists`,
      },
    ];
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID';
    errorMessages = [
      {
        path: err.path,
        message: err.message,
      },
    ];
  }

  const errorResponse: IErrorResponse = {
    statusCode,
    message,
    errorMessages: errorMessages.length > 0 ? errorMessages : undefined,
  };

  // Include stack trace in development mode
  if (config.node_env === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json({
    success: false,
    ...errorResponse,
  });
};

export default globalErrorHandler;
