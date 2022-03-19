import { Session, User } from "@supabase/supabase-js";
import { Auth } from "@supabase/ui";
import useSWR from "swr";
import { OkrDisplay } from "../components/okrdisplay";
import { selectOkrs } from "../database/SelectOkrsAction";
import { DataFetchError } from "../types/DataFetchError";
import { Okr } from "../types/Okr";
import { supabaseClient } from "../utils/initSupabase";

export default function Okrs() {
  const { user, session }: { user: User; session: Session } = Auth.useUser();
  const { data: okrs, error } = useSWR<Okr[] | null, DataFetchError>(
    session ? ["/api/getOkrs", session.access_token] : null,
    selectOkrs
  );
  return okrs?.map((okr, i) => <OkrDisplay key={i} okr={okr} />) ?? <></>;
}

export async function getServerSideProps({ req }: { req: any }) {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } };
  }

  return { props: {} };
}
