import useSWR from "swr";
import { Auth, Card } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";
import { useEffect, useState } from "react";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { AuthView } from "../types/AuthView";
import { View } from "../components/view";
import { DataFetchError } from "../types/DataFetchError";

async function fetcher(url: string, token: string): Promise<User> {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  });
  return res.json();
}

export default function Index(): JSX.Element {
  const { user, session }: { user: User; session: Session } = Auth.useUser();
  const { data, error } = useSWR<User, DataFetchError>(
    session ? ["/api/getUser", session.access_token] : null,
    fetcher
  );
  const [authView, setAuthView] = useState<AuthView>("sign_in");

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
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <div style={{ maxWidth: "420px", margin: "96px auto" }}>
      <Card>
        <View
          user={user}
          supabaseClient={supabaseClient}
          authView={authView}
          userData={data}
          error={error}
        />
      </Card>
    </div>
  );
}
