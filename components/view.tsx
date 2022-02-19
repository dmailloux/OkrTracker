import Link from "next/link";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { Auth, Typography, Space, Button, Icon } from "@supabase/ui";
import { AuthView } from "../types/AuthView";
import { DataFetchError } from "../types/DataFetchError";

interface ViewProps {
  user: User;
  supabaseClient: SupabaseClient;
  authView: AuthView;
  userData?: User;
  error?: DataFetchError;
}

export function View({
  user,
  supabaseClient,
  authView,
  userData,
  error,
}: ViewProps): JSX.Element {
  if (!user)
    return (
      <Space direction="vertical" size={0}>
        <div>
          <Typography.Title level={3}>Oakra</Typography.Title>
        </div>
        <Auth
          supabaseClient={supabaseClient}
          view={authView}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      </Space>
    );

  return (
    <Space direction="vertical" size={6}>
      {authView === "forgotten_password" && (
        <Auth.UpdatePassword supabaseClient={supabaseClient} />
      )}
      {user && (
        <>
          <Typography.Text>You're signed in</Typography.Text>
          <Typography.Text strong>Email: {user.email}</Typography.Text>

          <Button
            icon={<Icon type="LogOut" src={""} />}
            type="outline"
            onClick={() => supabaseClient.auth.signOut()}
          >
            Log out
          </Button>
          {error && (
            <Typography.Text type="danger">
              Failed to fetch user!
            </Typography.Text>
          )}
          {userData && !error ? (
            <>
              <Typography.Text type="success">
                User data retrieved server-side (in API route):
              </Typography.Text>

              <Typography.Text>
                <pre>{JSON.stringify(userData, null, 2)}</pre>
              </Typography.Text>
            </>
          ) : (
            <div>Loading...</div>
          )}

          <Typography.Text>
            <Link href="/profile">
              <a>SSR example with getServerSideProps</a>
            </Link>
          </Typography.Text>
        </>
      )}
    </Space>
  );
}
