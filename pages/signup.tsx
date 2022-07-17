import { supabaseClient } from "../utils/initSupabase";
import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Group,
  Button,
  TextInput,
  Card,
  Title,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { Mail } from "tabler-icons-react";
import { X } from "tabler-icons-react";
import styles from "../styles/signup.module.scss";

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
        icon: <Mail />,
      });
    } catch (error) {
      notifications.showNotification({
        title: "Something went wrong",
        message: "Your verification email has not been sent",
        icon: <X />,
        color: "red",
      });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Card radius="lg" className={styles.cardContainer}>
        <Title order={1} className={styles.title} m="lg">
          Create your Account
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
          <TextInput
            required
            id="email-input"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            id="password-input"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            required
            id="confirm-password-input"
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Card>
    </div>
  );
}
