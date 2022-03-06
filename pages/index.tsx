import useSWR from "swr";
import { Auth, Card, Typography } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";
import { useEffect, useState } from "react";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { AuthView } from "../types/AuthView";
import { View } from "../components/view";
import { DataFetchError } from "../types/DataFetchError";
import { Okr } from "../types/Okr";

async function fetchOkrs(): Promise<Okr[] | null> {
  const { data, error } = await supabaseClient
    .from("objectives")
    .select("id, name, due_at, keyresults (id, description)");
  return data;
}

export default function Index(): JSX.Element {
  const { user, session }: { user: User; session: Session } = Auth.useUser();
  const [authView, setAuthView] = useState<AuthView>("sign_in");
  const { data: okrs, error } = useSWR<Okr[] | null, DataFetchError>(
    session ? ["/api/getOkrs", session.access_token] : null,
    fetchOkrs
  );

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        switch (event) {
          case "PASSWORD_RECOVERY":
            setAuthView("forgotten_password");
            break;
          case "USER_UPDATED":
            setTimeout(() => setAuthView("sign_in"), 1000);
            break;
          default:
            break;
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [authView]);

  return (
    <div>
      <Card>
        {error ? (
          <Typography.Text type="danger">Failed to fetch user!</Typography.Text>
        ) : (
          <View
            user={user}
            supabaseClient={supabaseClient}
            authView={authView}
            okrData={okrs}
          />
        )}
      </Card>
    </div>
  );
}
