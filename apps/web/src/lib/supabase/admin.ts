import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-side only: uses service role to bypass RLS for controlled operations
export async function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase URL or service role key environment variables");
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}