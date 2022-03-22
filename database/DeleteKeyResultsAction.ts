import { supabaseClient } from "../utils/initSupabase";
import { KeyResult } from "../types/KeyResult";

interface SupabaseDeleteKeyResultResponse {
  data: KeyResult[] | null;
  error: unknown;
}

export async function deleteKeyResults(
  keyResultIds: string[]
): Promise<KeyResult[]> {
  const { data, error }: SupabaseDeleteKeyResultResponse = await supabaseClient
    .from("keyresults")
    .delete()
    .in("id", keyResultIds);

  if (error || data == null) {
    throw Error("Request to delete keyresults failed");
  }
  return data;
}
