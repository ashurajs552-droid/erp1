# Gradespark ERP

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Deployment Steps

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables:**
   - In Vercel project settings, go to "Environment Variables"
   - Add `OPENAI_API_KEY` with your OpenAI API key
   - **Important:** Do NOT commit API keys to git. Only add them in Vercel's dashboard.
   - Apply to Production, Preview, and Development environments

4. **Deploy:**
   - Vercel will automatically build and deploy your project
   - Your app will be live at `https://your-project.vercel.app`

### Environment Variables

Create a `.env.local` file for local development:
```
OPENAI_API_KEY=your_openai_api_key_here
```

**Note:** The `.env.local` file is already in `.gitignore` and won't be committed.

### Features

- ✅ Next.js 16 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ OpenAI API Integration
- ✅ AI-powered Homework Helper
- ✅ Student Tools & Dashboard
- ✅ Responsive Design

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase Authentication

This app uses Supabase for email/password auth.

### Setup Instructions

1. **Environment Variables:**
   Add these environment variables locally and in Vercel:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # For admin operations (optional, for creating users)
   ```
   
   **Getting your Service Role Key:**
   - Go to Supabase Dashboard → Project Settings → API
   - Copy the "service_role" key (⚠️ Keep this secret, never commit it!)
   - Add it to `.env.local` for local development only

2. **Authentication Settings:**
   - In Supabase → Authentication → Providers, ensure Email auth is enabled.
   - **Email Confirmation:** Email confirmation is enabled by default (recommended for production)
     - Users must confirm their email before logging in
     - After sign-up, users receive a confirmation email
     - To disable: Supabase Dashboard → Authentication → Settings → Disable "Enable email confirmations"

3. **Creating a Test User Account:**
   To create a user account without email confirmation:
   
   ```bash
   # Make sure you have SUPABASE_SERVICE_ROLE_KEY in .env.local
   node scripts/create-user-simple.js
   ```
   
   This will create a user with:
   - Email: `ashurajs551@gmail.com`
   - Password: `12345678`
   - Email auto-confirmed (no email sent)
   - Profile automatically created

   **Alternative:** Use the API endpoint:
   ```bash
   # Start dev server first: npm run dev
   curl -X POST http://localhost:3000/api/admin/create-user
   ```

4. **Database Tables:**
   The following tables are automatically created:
   - **auth.users** (built-in Supabase table)
   - **public.profiles** (custom table for extended user data)
     - Automatically created when a user signs up
     - Stores: name, email, full_name, avatar_url, role
     - Protected with Row Level Security (RLS)
     - Users can only access their own profile data

5. **Database Migration:**
   The migration file is located at `supabase/migrations/create_user_profiles.sql`
   - This migration has already been applied to your Supabase project
   - Creates profiles table with automatic triggers
   - Sets up RLS policies for secure data access

### Security Features

- ✅ Row Level Security (RLS) enabled on profiles table
- ✅ Users can only view/update their own profiles
- ✅ Automatic profile creation on user sign-up
- ✅ Secure function execution with proper search paths

### Database Management

- **Supabase MCP Integration:** Database management is handled through Supabase MCP (Model Context Protocol)
- **Authorization:** Supabase handles all database authorization automatically through RLS policies
- **Project Reference:** `jonamnlkgznmizhvrngd`
- Database operations (migrations, queries, table management) are managed via Supabase dashboard and MCP
