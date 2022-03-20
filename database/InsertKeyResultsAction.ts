import { supabaseClient } from "../utils/initSupabase";
import { KeyResult } from "../types/KeyResult";

interface SupabaseInsertKeyResultsResponse {
  data: KeyResult[] | null;
  error: unknown;
}

export async function insertKeyResults(
  keyResults: KeyResult[]
): Promise<KeyResult[]> {
  const { data, error }: SupabaseInsertKeyResultsResponse = await supabaseClient
    .from("keyresults")
    .insert(keyResults);
  if (error || data == null) {
    throw Error("Request to create keyresults failed");
  }
  return data;
}
