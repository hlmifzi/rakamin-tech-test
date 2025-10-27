import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          try {
            // @ts-expect-error: Runtime may not expose getAll; fallback to empty
            return cookieStore.getAll?.() ?? []
          } catch {
            return []
          }
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // @ts-expect-error: Runtime may not expose set; ignore when unavailable
              cookieStore.set?.(name, value, options)
            })
          } catch {
            // Ignore when called from Server Components without writable cookies
          }
        },
      },
    }
  )
}