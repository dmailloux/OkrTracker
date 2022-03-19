import { supabaseClient } from "../utils/initSupabase";
import { useForm } from "@mantine/form";
import { Box, PasswordInput, Group, Button, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";

export default function SignUp(): JSX.Element {
  const notifications = useNotifications();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { email, password } = values;
    try {
      await supabaseClient.auth.signUp({ email: email, password: password });
      notifications.showNotification({
        title: "Verification Email Sent",
        message: "Please check your email to verify your account",
        // TODO: Install icon pack and put a checkmark here
        // icon:
      });
    } catch (error) {
      notifications.showNotification({
        title: "Something went wrong",
        message: "Your verification email has not been sent",
        // TODO: Install icon pack and put a checkmark here
        // icon:
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <PasswordInput
          required
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
