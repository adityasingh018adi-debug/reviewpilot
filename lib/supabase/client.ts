import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";

// Browser-side Supabase client (used in Client Components)
// Falls back to placeholder strings during build so SSR pre-rendering doesn't crash
export const createClient = () =>
  createClientComponentClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key",
  });
