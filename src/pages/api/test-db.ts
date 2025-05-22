import { supabase } from '../../lib/supabase';
import type { NextApiResponse } from 'next';

export default async function handler(
  _: unknown,
  res: NextApiResponse
) {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('contact_messages')
      .select('count')
      .limit(1);

    if (error) throw error;

    return res.status(200).json({ 
      status: 'Database connection successful',
      messageCount: data?.length || 0
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return res.status(500).json({ 
      status: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 