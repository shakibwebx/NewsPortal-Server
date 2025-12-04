import { Request, Response } from 'express';

const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    error: {
      path: req.originalUrl,
      method: req.method,
    },
  });
};

export default notFound;
