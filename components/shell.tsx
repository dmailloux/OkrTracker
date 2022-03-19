import { Button } from "@mantine/core";
import { supabaseClient } from "../utils/initSupabase";
import { AppShell, Header } from "@mantine/core";

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
  return (
    <Header height={60} p="xs">
      <Button onClick={() => supabaseClient.auth.signOut()}>Log out</Button>
    </Header>
  );
}
