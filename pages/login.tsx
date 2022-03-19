import { Auth, Card, Space, Typography } from "@supabase/ui";
import { supabaseClient } from "../utils/initSupabase";
import { GetServerSideProps } from "next";

export default function Login(): JSX.Element {
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabaseClient.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: "/okrs" } };
  }

  return { props: {} };
};
