import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiHandler } from 'next';
import { verifyToken, JWTPayload } from '../utils/jwt';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: JWTPayload;
}

export function withAuth(handler: NextApiHandler) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      // Get token from header
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Verify JWT token
      const payload = verifyToken(token);
      req.user = payload;

      return handler(req, res);
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ error: 'Authentication failed' });
    }
  };
} 