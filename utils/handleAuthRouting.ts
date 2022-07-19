import { AuthChangeEvent } from "@supabase/supabase-js";

export function handleAuthRouting(event: AuthChangeEvent) {
  switch (event) {
    case "SIGNED_IN":
      location.replace("/okrs");
      break;
    case "SIGNED_OUT":
      location.replace("/");
      break;
  }
}
