import { Button } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";

export default function Header() {
  return (
    <Button type="outline" onClick={() => supabaseClient.auth.signOut()}>
      Log out
    </Button>
  );
}
