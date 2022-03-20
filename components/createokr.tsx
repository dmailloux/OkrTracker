import { formList, useForm } from "@mantine/form";
import { Box, Group, Button, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { createOkr } from "../database/CreateOkrAction";
import { Okr } from "../types/Okr";
import { Auth } from "@supabase/ui";
import { Session, User } from "@supabase/supabase-js";

export default function CreateOkr(): JSX.Element {
  const { user, session }: { user: User; session: Session } = Auth.useUser();
  const notifications = useNotifications();
  const form = useForm({
    initialValues: {
      objective: "",
      // keyResults: formList([{ description: "" }]),
    },

    validate: {
      objective: (value: string) =>
        value.length < 1 ? "Must have objective" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { objective } = values;
    console.log(objective);
    const okr = { name: values.objective, user_id: user.id };

    try {
      const { data } = await createOkr(okr as Okr);
      notifications.showNotification({
        title: "Okr Added",
        message: "Okr has been successfully saved",
      });
    } catch (error) {
      notifications.showNotification({
        title: "Something went wrong",
        message: "Okr has not been saved",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Objective"
          placeholder="Increase output by 100%"
          {...form.getInputProps("objective")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
