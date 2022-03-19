import { Auth } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";
import type { AppProps } from "next/app";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useEffect } from "react";

async function updateSupabaseAuthCookie(
  event: AuthChangeEvent,
  session: Session | null
) {
  await fetch("/api/auth", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  });
}
import { handleAuthRouting } from "../utils/handleAuthRouting";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        updateSupabaseAuthCookie(event, session);
        handleAuthRouting(event, session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  });

  return (
    <main className={"dark"}>
      <Auth.UserContextProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </main>
  );
}
