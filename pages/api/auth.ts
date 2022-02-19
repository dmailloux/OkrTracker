/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */
import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../utils/initSupabase";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  supabaseClient.auth.api.setAuthCookie(req, res);
}
