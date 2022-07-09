import { SupabaseClient, User } from "@supabase/supabase-js";
import { Auth, Typography, Space, Button, Icon } from "@supabase/ui";
import { AuthView } from "../types/AuthView";

interface ViewProps {
  user: User;
  supabaseClient: SupabaseClient;
  authView: AuthView;
}

export function View({
  user,
  supabaseClient,
  authView,
}: ViewProps): JSX.Element {
  if (!user)
    return (
      <Space direction="vertical" size={0}>
        <div>
          <Typography.Title level={3}>Okr Tracker</Typography.Title>
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
        </>
      )}
    </Space>
  );
}
