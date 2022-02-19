import { Auth } from "@supabase/ui";
import { supabase } from "../utils/initSupabase";
import type { AppProps } from "next/app";
// import "../styles/style.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <main className={"dark"}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </main>
  );
}
