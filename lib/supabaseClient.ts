import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a singleton client instance
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    // Default to project URL if env var is missing (for development)
    const url = supabaseUrl || 'https://jonamnlkgznmizhvrngd.supabase.co';
    const key = supabaseAnonKey || '';
    
    // Warn if using defaults in browser
    if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
      console.warn('⚠️ Supabase environment variables not found. Using defaults.');
      console.warn('Please create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    
    if (!key) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is required!');
      throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Please check your .env.local file.');
    }
    
    supabaseInstance = createClient(url, key, {
      auth: {
        persistSession: typeof window !== 'undefined',
        autoRefreshToken: typeof window !== 'undefined',
        detectSessionInUrl: typeof window !== 'undefined',
      },
    });
  }
  return supabaseInstance;
}

export const supabase = getSupabaseClient();


