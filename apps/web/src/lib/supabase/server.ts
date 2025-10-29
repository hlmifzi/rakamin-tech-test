import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Gracefully handle missing envs in production to avoid SSR crashes
  if (!url || !anonKey) {
    console.error(
      'Supabase env missing: ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
    )
    return null as unknown as ReturnType<typeof createServerClient>
  }

  return createServerClient(url, anonKey, {
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
  })
}