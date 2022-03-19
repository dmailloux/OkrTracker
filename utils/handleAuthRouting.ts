import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import Router from "next/router";

export function handleAuthRouting(
  event: AuthChangeEvent,
  session: Session | null
) {
  switch (event) {
    case "SIGNED_IN":
      Router.push("/okrs");
      break;
    case "SIGNED_OUT":
      Router.push("/");
      break;
  }
}
