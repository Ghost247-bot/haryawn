import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with the service role key for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Create a Supabase client with the anon key for regular operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log('Attempting login for:', email);

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User authenticated:', data.user.id);

    // Check if user is an admin using the admin client
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('user_id', data.user.id)
      .single();

    if (adminError) {
      console.error('Admin check error:', adminError);
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    if (!adminData) {
      console.error('User is not an admin:', data.user.id);
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    console.log('Admin access confirmed');

    // Get the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Session error:', sessionError);
      return res.status(500).json({ message: 'Failed to create session' });
    }

    // Set the session cookies
    res.setHeader('Set-Cookie', [
      `sb-access-token=${session.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
      `sb-refresh-token=${session.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`
    ]);

    console.log('Login successful for:', email);

    return res.status(200).json({ 
      message: 'Login successful',
      user: {
        id: data.user.id,
        email: data.user.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 