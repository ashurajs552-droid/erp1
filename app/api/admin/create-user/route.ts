import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Admin API route to create a user account
 * This bypasses email confirmation by using the service role key
 * 
 * WARNING: This should be protected in production or removed after initial setup
 */
export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(
      { error: 'Missing Supabase configuration' },
      { status: 500 }
    );
  }

  // Create admin client (bypasses RLS and email confirmation)
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const email = 'ashurajs551@gmail.com';
  const password = '12345678';
  const name = 'Ashuraj';

  try {
    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);

    if (existingUser) {
      return NextResponse.json({
        message: 'User already exists',
        user: {
          id: existingUser.id,
          email: existingUser.email,
          email_confirmed: !!existingUser.email_confirmed_at,
        },
      });
    }

    // Create user with admin client (this bypasses email confirmation)
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email - no email sent
      user_metadata: {
        name: name,
      },
    });

    if (createError) {
      return NextResponse.json(
        { error: `Failed to create user: ${createError.message}` },
        { status: 400 }
      );
    }

    if (!userData.user) {
      return NextResponse.json(
        { error: 'User creation failed: No user data returned' },
        { status: 500 }
      );
    }

    // Wait a moment for the trigger to create the profile
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if profile was created automatically
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .single();

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: userData.user.id,
        email: userData.user.email,
        email_confirmed: !!userData.user.email_confirmed_at,
        name: userData.user.user_metadata?.name,
      },
      profile: profile || null,
      credentials: {
        email: 'ashurajs551@gmail.com',
        password: '12345678',
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
