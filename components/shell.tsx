import { AppShell, Button, Group, Header, Text } from "@mantine/core";
import { supabaseClient } from "../utils/initSupabase";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/ui";
import Router from "next/router";
import Link from "next/link";

function HeaderContent(): JSX.Element {
  const { session }: { session: Session } = Auth.useUser();

  return (
    <Header height={70} p="lg">
      <Group align="center" position="apart">
        <Link href="/" passHref>
          <Text size="xl" component="a">
            Okr Tracker
          </Text>
        </Link>
        <Group>
          {session ? (
            <Button
              size="sm"
              variant="subtle"
              onClick={() => supabaseClient.auth.signOut()}
            >
              Log out
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="subtle"
                onClick={() => Router.push("/login")}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                variant="subtle"
                onClick={() => Router.push("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </Group>
      </Group>
    </Header>
  );
}

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
