import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

// Server-side Supabase client (used in Server Components & Route Handlers)
export const createServerClient = () =>
  createServerComponentClient<Database>(
    { cookies },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key",
    }
  );
