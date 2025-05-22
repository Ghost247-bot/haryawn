import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { supabase } from '../../../lib/supabase';

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
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verify admin access
  if (!verifyAdmin(req)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Fetch total appointments
    const { count: totalAppointments } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true });

    // Fetch pending appointments
    const { count: pendingAppointments } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Fetch total subscribers
    const { count: totalSubscribers } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true });

    // Fetch total messages
    const { count: totalMessages } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true });

    return res.status(200).json({
      totalAppointments: totalAppointments || 0,
      pendingAppointments: pendingAppointments || 0,
      totalSubscribers: totalSubscribers || 0,
      totalMessages: totalMessages || 0,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 