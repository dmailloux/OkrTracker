import { supabaseClient } from "../utils/initSupabase";
import { KeyResult } from "../types/KeyResult";

interface SupabaseDeleteKeyResultResponse {
  data: KeyResult[] | null;
  error: unknown;
}

export async function deleteKeyResults(
  keyResults: KeyResult[]
): Promise<KeyResult[]> {
  const keyResultIdsToDelete: string[] = keyResults
    .filter((x) => x.id != null)
    .map((x) => x.id!);

  const { data, error }: SupabaseDeleteKeyResultResponse = await supabaseClient
    .from("keyresults")
    .delete()
    .in("id", keyResultIdsToDelete);

  if (error || data == null) {
    throw Error("Request to delete keyresults failed");
  }
  return data;
}
