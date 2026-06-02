import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey
  = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// The Supabase clients are created lazily (on first use) rather than at module
// load. `next build` imports these modules to collect page/route data but does
// not execute the handlers, so deferring creation stops the build throwing
// "supabaseUrl is required" when the Supabase env is absent (e.g. in CI or on
// fork PRs). At runtime the env is present and the real client is created on
// first property access. If the env is genuinely missing at runtime, the error
// is raised then (loudly, at the call site) instead of being swallowed.
let anonClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

function createOrThrow(key: string | undefined, role: 'anon' | 'service-role'): SupabaseClient {
  if (!url || !key) {
    throw new Error(
      `Supabase ${role} client unavailable: missing `
      + `${!url ? 'NEXT_PUBLIC_SUPABASE_URL' : 'the Supabase key'} in the environment.`,
    );
  }
  return createClient(url, key);
}

// Proxy that builds the real client on first access and forwards everything to
// it (binding methods so `this` stays the real client), keeping the existing
// `supabase` / `supabaseAdmin` value API intact for callers.
function lazyClient(getClient: () => SupabaseClient): SupabaseClient {
  return new Proxy({} as SupabaseClient, {
    get(_target, prop, receiver) {
      const client = getClient();
      const value = Reflect.get(client as object, prop, receiver);
      return typeof value === 'function' ? value.bind(client) : value;
    },
  });
}

export const supabase: SupabaseClient = lazyClient(
  () => (anonClient ??= createOrThrow(anonKey, 'anon')),
);
export const supabaseAdmin: SupabaseClient = lazyClient(
  () => (adminClient ??= createOrThrow(serviceRoleKey, 'service-role')),
);
