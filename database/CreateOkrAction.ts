import { supabaseClient } from "../utils/initSupabase";
import { Okr } from "../types/Okr";

interface CreateOkrReturn {
  data: any[] | null;
}

export async function createOkr(okr: Okr): Promise<CreateOkrReturn> {
  const { data, error } = await supabaseClient.from("objectives").insert(okr);
  if (error) {
    throw Error("Request to create okr failed");
  }
  return { data };
}
