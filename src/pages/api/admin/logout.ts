import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }

    // Clear the session cookies
    res.setHeader('Set-Cookie', [
      'sb-access-token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
      'sb-refresh-token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0'
    ]);

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 