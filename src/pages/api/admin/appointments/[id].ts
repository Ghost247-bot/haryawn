import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { supabase } from '../../../../lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

// Middleware to verify admin token
const verifyAdmin = (req: NextApiRequest) => {
  const token = req.cookies.admin_token;
  if (!token) return false;

  try {
    const decoded = verify(token, JWT_SECRET);
    return decoded && (decoded as any).role === 'admin';
  } catch {
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify admin access
  if (!verifyAdmin(req)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const { status } = req.body;

      if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const { data, error } = await supabase
        .from('appointments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json({ appointment: data });
    } catch (error) {
      console.error('Error updating appointment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 