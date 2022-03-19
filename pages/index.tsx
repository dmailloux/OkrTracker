import useSWR from "swr";
import { Auth, Card, Typography } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";
import { Session, User } from "@supabase/supabase-js";
import { View } from "../components/view";
import { DataFetchError } from "../types/DataFetchError";
import { Okr } from "../types/Okr";
import { selectOkrs } from "../database/SelectOkrsAction";

export default function Index(): JSX.Element {
  const { user, session }: { user: User; session: Session } = Auth.useUser();
  const { data: okrs, error } = useSWR<Okr[] | null, DataFetchError>(
    session ? ["/api/getOkrs", session.access_token] : null,
    selectOkrs
  );

  return (
    <Card>
      {error ? (
        <Typography.Text type="danger">Failed to fetch user!</Typography.Text>
      ) : (
        <View
          user={user}
          supabaseClient={supabaseClient}
          authView={"sign_in"}
          okrData={okrs}
        />
      )}
    </Card>
  );
}
