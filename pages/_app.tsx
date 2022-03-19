import { Auth } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";
import type { AppProps } from "next/app";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { handleAuthRouting } from "../utils/handleAuthRouting";
import { updateSupabaseAuthCookie } from "../utils/updateSupabaseAuthCookie";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
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
