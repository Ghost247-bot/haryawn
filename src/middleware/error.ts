import { NextApiRequest, NextApiResponse } from 'next';
import { PostgrestError } from '@supabase/supabase-js';

export function withErrorHandler(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);

      // Handle Supabase errors
      if (error instanceof PostgrestError) {
        return res.status(400).json({
          error: 'Database error',
          details: error.message,
          code: error.code
        });
      }

      // Handle other errors
      return res.status(500).json({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
} 