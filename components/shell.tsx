import { Button, Grid } from "@mantine/core";
import { supabaseClient } from "../utils/initSupabase";
import { AppShell, Header } from "@mantine/core";
import { Session, User } from "@supabase/supabase-js";
import { Auth } from "@supabase/ui";
import Router from "next/router";

interface ShellProps {
  children: JSX.Element | JSX.Element[];
}

export default function Shell({ children }: ShellProps): JSX.Element {
  return (
    <AppShell
      header={<HeaderContent />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}

function HeaderContent(): JSX.Element {
  const { session }: { session: Session } = Auth.useUser();

  return (
    <Header height={60} p="xs">
      <Grid justify="flex-end">
        {session ? (
          <Grid.Col span={1}>
            <Button onClick={() => supabaseClient.auth.signOut()}>
              Log out
            </Button>
          </Grid.Col>
        ) : (
          <>
            <Grid.Col span={1}>
              <Button onClick={() => Router.push("/login")}>Sign In</Button>
            </Grid.Col>

            <Grid.Col span={1}>
              <Button onClick={() => Router.push("/signup")}>Sign Up</Button>
            </Grid.Col>
          </>
        )}
      </Grid>
    </Header>
  );
}
