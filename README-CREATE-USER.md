# Create User Account in Supabase

The profiles table is currently empty. To create the user account `ashurajs551@gmail.com`, run:

```bash
./scripts/create-user-immediate.sh
```

This script will:
1. Prompt you for your Supabase Service Role Key
2. Create the user in `auth.users` table
3. Auto-create the profile in `profiles` table via database trigger
4. Email is auto-confirmed (no email sent)

## Quick Steps:

1. Get Service Role Key:
   - Go to: https://supabase.com/dashboard/project/jonamnlkgznmizhvrngd/settings/api
   - Copy the `service_role` key

2. Run the script:
   ```bash
   cd /Users/blinks2780/erp
   ./scripts/create-user-immediate.sh
   ```

3. Paste your Service Role Key when prompted

4. User will be created with:
   - Email: ashurajs551@gmail.com
   - Password: 12345678
   - Stored in Supabase database (not hardcoded)

5. You can then log in with these credentials!
