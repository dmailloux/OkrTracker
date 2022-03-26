import { Auth, Card } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";
import { Session, User } from "@supabase/supabase-js";
import { View } from "../components/view";

export default function Index(): JSX.Element {
  const { user, session }: { user: User; session: Session } = Auth.useUser();

  return (
    <Card>
      <View user={user} supabaseClient={supabaseClient} authView={"sign_in"} />
    </Card>
  );
}
