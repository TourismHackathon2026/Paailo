// Export a safe Supabase client reference that defers to the project's
// canonical accessor in `lib/supabase.ts`. That module guards against
// missing or placeholder environment variables and caches the client.
import { getSupabaseClient } from '@/lib/supabase'

// `getSupabaseClient()` returns `SupabaseClient | null` depending on
// runtime configuration. Export the result so callers can handle the
// absence of a configured client gracefully.
export const supabase = getSupabaseClient()