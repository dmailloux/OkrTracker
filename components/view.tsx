import { SupabaseClient, User } from "@supabase/supabase-js";
import { Auth, Typography, Space, Button, Icon } from "@supabase/ui";
import { AuthView } from "../types/AuthView";
import { Okr } from "../types/Okr";
import { OkrDisplay } from "./okrdisplay";

interface ViewProps {
  user: User;
  supabaseClient: SupabaseClient;
  authView: AuthView;
  okrData?: Okr[] | null;
}

export function View({
  user,
  supabaseClient,
  authView,
  okrData,
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
          {okrData ? (
            okrData?.map((okr: Okr, i) => {
              return <OkrDisplay key={i} okr={okr} />;
            })
          ) : (
            <div>Loading...</div>
          )}
        </>
      )}
    </Space>
  );
}
