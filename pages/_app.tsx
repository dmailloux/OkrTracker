import { Auth } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";
import type { AppProps } from "next/app";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { handleAuthRouting } from "../utils/handleAuthRouting";
import { updateSupabaseAuthCookie } from "../utils/updateSupabaseAuthCookie";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/layout";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        updateSupabaseAuthCookie(event, session);

        // if user signs in or out anywhere in the app, route them appropriately
        handleAuthRouting(event);
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
            primaryColor: "indigo",
          }}
        >
          <NotificationsProvider>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </NotificationsProvider>
        </MantineProvider>
      </Auth.UserContextProvider>
    </>
  );
}
