import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('Missing admin credentials. Please check your .env file.');
      return;
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    });

    if (authError) {
      console.error('Error creating admin user:', authError);
      return;
    }

    // Insert admin record
    const { error: adminError } = await supabase
      .from('admins')
      .insert([
        {
          user_id: authData.user.id,
          email: adminEmail,
        },
      ]);

    if (adminError) {
      console.error('Error creating admin record:', adminError);
      return;
    }

    console.log('Database setup completed successfully!');
    console.log('Admin user created with email:', adminEmail);
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

setupDatabase(); 