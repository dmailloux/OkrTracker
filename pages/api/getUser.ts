import { User } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../utils/initSupabase";

// Example of how to verify and get user data server-side.
export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const token: string = req.headers.token as string;

  const { data, error }: { data: User | null; error: Error | null } =
    await supabaseClient.auth.api.getUser(token);

  if (error) {
    return res.status(401).json({ errorMessage: error.message });
  }
  return res.status(200).json(data);
}
