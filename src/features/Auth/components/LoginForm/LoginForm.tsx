import { LoginDto } from "@/core/types";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

export interface LoginFormProps {
  onSubmit: (values: LoginDto) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { t } = useTranslation("auth");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => {
        if (value) {
          if (!/^\S+@\S+$/.test(value)) {
            return t("loginForm.errors.email");
          } else {
            return null;
          }
        }
      },
      password: (value) => {
        if (!value) {
          return t("loginForm.password.errors.required");
        }
        if (value.length < 8) {
          return t("loginForm.password.errors.length");
        }
        return null;
      },
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
      })}
    >
      <TextInput
        label={t("loginForm.email")}
        placeholder={t("loginForm.enterEmail")}
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label={t("loginForm.password.label")}
        placeholder={t("loginForm.password.placeholder")}
        mt="md"
        withAsterisk
        {...form.getInputProps("password")}
      />
      <Button type="submit" fullWidth mt="md">
        {t("loginForm.submitButton")}
      </Button>
    </form>
  );
}
