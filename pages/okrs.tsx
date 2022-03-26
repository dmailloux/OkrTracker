import { Session, User } from "@supabase/supabase-js";
import { Auth } from "@supabase/ui";
import { GetServerSideProps } from "next";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import CreateOkrForm from "../components/createokrform";
import { OkrDisplay } from "../components/okrdisplay";
import { selectOkrs } from "../database/SelectOkrsAction";
import { Okr } from "../types/Okr";
import { supabaseClient } from "../utils/initSupabase";

export default function Okrs() {
  const { user, session }: { user: User; session: Session } = Auth.useUser();
  const query: UseQueryResult<Okr[] | null, unknown> = useQuery(
    "okrs",
    selectOkrs
  );

  return (
    <>
      <CreateOkrForm />
      {query.data ? (
        query.data.map((okr, i) => <OkrDisplay key={i} okr={okr} />)
      ) : (
        <></>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } };
  }

  return { props: {} };
};
