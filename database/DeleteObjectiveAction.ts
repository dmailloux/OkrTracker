import { supabaseClient } from "../utils/initSupabase";
import { Objective } from "../types/Objective";

interface SupabaseDeleteObjectiveResponse {
  data: Objective[] | null;
  error: unknown;
}

export async function deleteObjective(objectiveId: string): Promise<Objective> {
  const { data, error }: SupabaseDeleteObjectiveResponse = await supabaseClient
    .from("objectives")
    .delete()
    .match({ id: objectiveId });

  if (error || data == null) {
    throw Error("Request to delete objective failed");
  }
  return data[0];
}
