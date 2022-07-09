import { AppShell, Button, Grid, Group, Header, Title } from "@mantine/core";
import { supabaseClient } from "../utils/initSupabase";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/ui";
import Router from "next/router";

interface ShellProps {
  children: JSX.Element | JSX.Element[];
}

export default function Shell({ children }: ShellProps): JSX.Element {
  return (
    <AppShell
      header={<HeaderContent />}
      fixed
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
    <Header height={60} p="xl">
      <Grid justify="space-between">
        <Title>Okr Tracker</Title>
        {session ? (
          <Group>
            <Button onClick={() => supabaseClient.auth.signOut()}>
              Log out
            </Button>
          </Group>
        ) : (
          <Group>
            <Button onClick={() => Router.push("/login")}>Sign In</Button>

            <Button onClick={() => Router.push("/signup")}>Sign Up</Button>
          </Group>
        )}
      </Grid>
    </Header>
  );
}
