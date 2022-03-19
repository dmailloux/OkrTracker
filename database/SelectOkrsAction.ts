import { supabaseClient } from "../utils/initSupabase";
import { Okr } from "../types/Okr";

export async function selectOkrs(): Promise<Okr[] | null> {
  const { data, error } = await supabaseClient
    .from("objectives")
    .select("id, name, due_at, keyresults (id, description)");
  return data;
}
