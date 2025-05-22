import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiHandler } from 'next';

export function withErrorHandler(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res);
    } catch (error: any) {
      console.error('API Error:', error);

      // Handle Prisma errors
      if (error?.name === 'PrismaClientKnownRequestError') {
        return res.status(400).json({
          error: 'Database operation failed',
          details: error.message
        });
      }

      // Handle validation errors
      if (error?.name === 'ValidationError') {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.message
        });
      }

      // Handle unauthorized errors
      if (error?.name === 'UnauthorizedError') {
        return res.status(401).json({
          error: 'Unauthorized',
          details: error.message
        });
      }

      // Default error
      return res.status(500).json({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };
} 