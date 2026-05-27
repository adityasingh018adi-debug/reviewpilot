// Returns true when real Supabase credentials are not configured.
// In this state the app skips auth and serves mock data so the UI is
// fully explorable without any external services.
export function isDemoMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return !url || url.includes("placeholder");
}
