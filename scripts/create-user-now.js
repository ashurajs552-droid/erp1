/**
 * Immediate script to create user in Supabase
 * Uses environment variables or prompts for service role key
 */

const { createClient } = require('@supabase/supabase-js');

// Get credentials from environment or use defaults
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jonamnlkgznmizhvrngd.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required!');
  console.error('\nPlease do one of the following:');
  console.error('1. Get your Service Role Key from:');
  console.error('   Supabase Dashboard → Project Settings → API → service_role key');
  console.error('\n2. Then run:');
  console.error('   export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  console.error('   node scripts/create-user-now.js');
  console.error('\nOR add it to .env.local and source it.');
  process.exit(1);
}

// Create admin client
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

  console.log('🔧 Creating user account in Supabase database...\n');
  console.log('   URL:', supabaseUrl);
  console.log('   Email:', email);
  console.log('   Name:', name);
  console.log('   Password: ********\n');

  try {
    // Check if user already exists
    console.log('📋 Checking for existing user...');
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Error:', listError.message);
      process.exit(1);
    }

    const existingUser = existingUsers?.users?.find(u => u.email === email);

    if (existingUser) {
      console.log('⚠️  User already exists!');
      console.log('   User ID:', existingUser.id);
      console.log('   Email Confirmed:', existingUser.email_confirmed_at ? 'Yes ✓' : 'No ✗');
      
      // Confirm email if not confirmed
      if (!existingUser.email_confirmed_at) {
        console.log('\n   Confirming email...');
        const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
          existingUser.id,
          { email_confirm: true }
        );
        
        if (confirmError) {
          console.error('❌ Error confirming email:', confirmError.message);
        } else {
          console.log('   ✓ Email confirmed');
        }
      }
      
      // Check and create profile if missing
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', existingUser.id)
        .single();

      if (!profile) {
        console.log('\n   Creating profile...');
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .insert({
            id: existingUser.id,
            email: existingUser.email,
            name: name,
            full_name: name,
            role: 'student'
          });

        if (profileError) {
          console.error('❌ Error creating profile:', profileError.message);
        } else {
          console.log('   ✓ Profile created');
        }
      } else {
        console.log('   ✓ Profile exists');
      }

      console.log('\n✅ User account ready!');
      console.log('\n📝 Login credentials:');
      console.log('   Email: ashurajs551@gmail.com');
      console.log('   Password: 12345678');
      return;
    }

    // Create new user
    console.log('   ✓ No existing user found');
    console.log('\n➕ Creating new user...');
    
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm - no email sent
      user_metadata: {
        name: name,
      },
    });

    if (createError) {
      console.error('❌ Error creating user:', createError.message);
      if (createError.message.includes('already registered')) {
        console.error('\n   User exists but was not found in list. Trying to confirm...');
      }
      process.exit(1);
    }

    if (!userData.user) {
      console.error('❌ User creation failed: No user data returned');
      process.exit(1);
    }

    console.log('   ✓ User created in auth.users table');
    console.log('   User ID:', userData.user.id);
    console.log('   Email Confirmed:', userData.user.email_confirmed_at ? 'Yes ✓' : 'No ✗');
    
    // Wait for trigger to create profile
    console.log('\n⏳ Waiting for profile creation (trigger)...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .single();

    if (profileError || !profile) {
      console.log('   ⚠️  Profile not auto-created, creating manually...');
      const { error: insertError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: userData.user.id,
          email: userData.user.email,
          name: name,
          full_name: name,
          role: 'student'
        });

      if (insertError) {
        console.error('❌ Error creating profile:', insertError.message);
      } else {
        console.log('   ✓ Profile created manually');
      }
    } else {
      console.log('   ✓ Profile created automatically by trigger');
      console.log('   Name:', profile.name);
      console.log('   Role:', profile.role);
    }

    console.log('\n✅ User account created successfully in Supabase database!');
    console.log('\n📝 Login credentials:');
    console.log('   Email: ashurajs551@gmail.com');
    console.log('   Password: 12345678');
    console.log('\n✅ You can now log in with these credentials!');
    console.log('   The user is stored in the database (not hardcoded).');
    console.log('   No email confirmation needed - account is ready.');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message || error);
    console.error(error);
    process.exit(1);
  }
}

createUser();
