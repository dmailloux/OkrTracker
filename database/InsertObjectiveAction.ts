import { supabaseClient } from "../utils/initSupabase";
import { Objective } from "../types/Objective";

interface SupabaseInsertObjectiveResponse {
  data: Objective[] | null;
  error: unknown;
}

export async function insertObjective(
  objective: Objective
): Promise<Objective> {
  const { data, error }: SupabaseInsertObjectiveResponse = await supabaseClient
    .from("objectives")
    .insert(objective);
  if (error || data == null) {
    throw Error("Request to create objective failed");
  }
  return data[0];
}
