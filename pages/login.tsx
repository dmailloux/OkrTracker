import { Session, User } from "@supabase/supabase-js";
import { Auth, Card, Space, Typography } from "@supabase/ui";
import { useEffect } from "react";
import { supabaseClient } from "../utils/initSupabase";
import Router from "next/router";

export default function Login() {
  const { user, session }: { user: User; session: Session } = Auth.useUser();

  useEffect(() => {
    if (session) {
      Router.push("/okrs");
    }
  }, [user, session]);

  return (
    <Card>
      <Space direction="vertical" size={0}>
        <div>
          <Typography.Title level={3}>Oakra</Typography.Title>
        </div>
        <Auth
          supabaseClient={supabaseClient}
          view={"sign_in"}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      </Space>
    </Card>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: "/okrs" } };
  }

  return { props: {} };
}
