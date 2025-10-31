/**
 * Script to create a user account in Supabase
 * This uses the Supabase Admin API to create a user without requiring email confirmation
 * 
 * Usage: 
 *   npx tsx scripts/create-user.ts
 * 
 * Environment variables needed:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (for admin operations)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing required environment variables:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('  SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceRoleKey ? '✓' : '✗');
  process.exit(1);
}

// Create admin client (bypasses RLS)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createUser() {
  const email = 'ashurajs551@gmail.com';
  const password = '12345678';
  const name = 'Ashuraj';

  console.log('Creating user account...');
  console.log('  Email:', email);
  console.log('  Name:', name);

  try {
    // Create user with admin client (this bypasses email confirmation)
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name: name,
      },
    });

    if (createError) {
      console.error('Error creating user:', createError.message);
      process.exit(1);
    }

    if (!userData.user) {
      console.error('User creation failed: No user data returned');
      process.exit(1);
    }

    console.log('\n✓ User created successfully!');
    console.log('  User ID:', userData.user.id);
    console.log('  Email:', userData.user.email);
    console.log('  Email Confirmed:', userData.user.email_confirmed_at ? 'Yes' : 'No');
    
    // Check if profile was created automatically
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .single();

    if (profileError || !profile) {
      console.log('\n⚠ Profile not found, but user was created.');
      console.log('  (Profile should be created automatically by trigger)');
    } else {
      console.log('\n✓ Profile created automatically!');
      console.log('  Name:', profile.name);
      console.log('  Role:', profile.role);
    }

    console.log('\n✓ Login credentials:');
    console.log('  Email: ashurajs551@gmail.com');
    console.log('  Password: 12345678');
    console.log('\n✓ You can now log in with these credentials!');

  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

createUser();
