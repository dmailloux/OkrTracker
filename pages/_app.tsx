import { Auth } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";
import type { AppProps } from "next/app";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { handleAuthRouting } from "../utils/handleAuthRouting";
import { updateSupabaseAuthCookie } from "../utils/updateSupabaseAuthCookie";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        updateSupabaseAuthCookie(event, session);

        // if user signs in or out anywhere in the app, route them appropriately
        handleAuthRouting(event, session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  });

  return (
    <>
      <Auth.UserContextProvider supabaseClient={supabaseClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            // Override any other properties from default theme
            fontFamily: "Open Sans, sans serif",
            colors: {
              brand: ["#182847", "#cbac7b", "#52617a", "#fffff"],
            },
            // primaryColor: "indigo",
            spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </Auth.UserContextProvider>
    </>
  );
}
