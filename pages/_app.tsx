import { Auth } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <main className={"dark"}>
      <Auth.UserContextProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </main>
  );
}
