// Minimal Supabase database type stub — replace with generated types from
// `npx supabase gen types typescript --linked > types/supabase.ts`
export type Database = {
  public: {
    Tables: Record<string, unknown>;
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
  };
};
