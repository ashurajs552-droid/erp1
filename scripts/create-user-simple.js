/**
 * Simple script to create a user in Supabase using Admin API
 * Run with: node scripts/create-user-simple.js
 * 
 * Requires environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceRoleKey ? '✓' : '✗');
  console.error('\nPlease add these to your .env.local file');
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

  console.log('🔧 Creating user account in Supabase...\n');
  console.log('   Email:', email);
  console.log('   Name:', name);
  console.log('   Password: ********\n');

  try {
    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Error checking existing users:', listError.message);
      process.exit(1);
    }

    const existingUser = existingUsers?.users?.find(u => u.email === email);

    if (existingUser) {
      console.log('⚠️  User already exists!');
      console.log('   User ID:', existingUser.id);
      console.log('   Email Confirmed:', existingUser.email_confirmed_at ? 'Yes ✓' : 'No ✗');
      
      // If not confirmed, confirm it now
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
      
      // Check profile
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', existingUser.id)
        .single();

      if (profile) {
        console.log('   ✓ Profile exists');
      } else {
        console.log('   ⚠️  Profile not found (should be created by trigger)');
      }

      console.log('\n✅ Login credentials:');
      console.log('   Email: ashurajs551@gmail.com');
      console.log('   Password: 12345678');
      return;
    }

    // Create user with admin client (this bypasses email confirmation)
    console.log('   Creating user...');
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email - no email sent
      user_metadata: {
        name: name,
      },
    });

    if (createError) {
      console.error('❌ Error creating user:', createError.message);
      process.exit(1);
    }

    if (!userData.user) {
      console.error('❌ User creation failed: No user data returned');
      process.exit(1);
    }

    console.log('   ✓ User created successfully!');
    console.log('   User ID:', userData.user.id);
    console.log('   Email Confirmed:', userData.user.email_confirmed_at ? 'Yes ✓' : 'No ✗');
    
    // Wait a moment for the trigger to create the profile
    console.log('\n   Waiting for profile creation...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if profile was created automatically
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .single();

    if (profileError || !profile) {
      console.log('   ⚠️  Profile not found yet (may take a moment)');
      console.log('   Profile should be created automatically by database trigger');
    } else {
      console.log('   ✓ Profile created automatically!');
      console.log('   Name:', profile.name);
      console.log('   Role:', profile.role);
    }

    console.log('\n✅ User account created successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Email: ashurajs551@gmail.com');
    console.log('   Password: 12345678');
    console.log('\n✅ You can now log in with these credentials!');
    console.log('   No email confirmation needed - account is ready to use.');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message || error);
    process.exit(1);
  }
}

createUser();
