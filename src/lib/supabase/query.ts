import type { PostgrestError } from "@supabase/supabase-js";

type SupabaseResult<T> = PromiseLike<{ data: T | null; error: PostgrestError | null }>;

export async function fetchQuery<T>(query: SupabaseResult<T>, label?: string): Promise<T> {
  const { data, error } = await query;
  if (error) {
    throw new Error(`Supabase query failed${label ? ` [${label}]` : ""}: ${error.message}`);
  }
  if (data === null) {
    throw new Error(`Supabase query returned null${label ? ` [${label}]` : ""}`);
  }
  return data;
}
