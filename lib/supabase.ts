import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

function isPlaceholderValue(value: string) {
  return !value || value === "https://example.supabase.co" || value === "your-anon-key";
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey && !isPlaceholderValue(supabaseUrl) && !isPlaceholderValue(supabaseAnonKey));
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return cachedClient;
}

export function getSupabaseConfigMessage() {
  if (isSupabaseConfigured()) {
    return null;
  }

  return "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live data.";
}
