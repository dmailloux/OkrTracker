import { formList, useForm } from "@mantine/form";
import { Box, Group, Button, TextInput, ActionIcon, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { Auth } from "@supabase/ui";
import { Session, User } from "@supabase/supabase-js";
import { Trash } from "tabler-icons-react";
import { insertObjective } from "../database/InsertObjectiveAction";
import { Objective } from "../types/Objective";
import { KeyResult } from "../types/KeyResult";
import { insertKeyResults } from "../database/InsertKeyResultsAction";

export default function CreateOkrForm(): JSX.Element {
  const { user, session }: { user: User; session: Session } = Auth.useUser();
  const notifications = useNotifications();
  const form = useForm({
    initialValues: {
      objective: "",
      keyResults: formList([{ description: "" }]),
    },

    validate: {
      objective: (value: string) =>
        value.length < 1 ? "Must have objective" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { objective, keyResults } = values;
    const objectiveToInsert: Objective = {
      name: objective,
      user_id: user.id,
    };

    try {
      const objectiveData: Objective = await insertObjective(objectiveToInsert);
      const keyresults: KeyResult[] = keyResults.map((keyResult) => ({
        description: keyResult.description,
        user_id: user.id,
        objective_id: objectiveData.id!,
      }));
      const keyResultsData: KeyResult[] = await insertKeyResults(keyresults);

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

        {form.values.keyResults.map((_, i) => (
          <Group key={i} mt="xs">
            <TextInput
              label={`Key Result ${i + 1}`}
              placeholder="Climb Mt. Everest..."
              required
              sx={{ flex: 1 }}
              {...form.getListInputProps("keyResults", i, "description")}
            />
            <ActionIcon
              color="red"
              variant="hover"
              onClick={() => form.removeListItem("keyResults", i)}
            >
              <Trash size={16} />
            </ActionIcon>
          </Group>
        ))}

        <Group position="center" mt="md">
          <Button
            onClick={() => form.addListItem("keyResults", { description: "" })}
          >
            Add Key Result
          </Button>
        </Group>

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
