import { LoginDto } from "@/core/types";
import { Anchor, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface LoginFormProps {
  onSubmit: (values: LoginDto) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => {
        if (value) {
          if (!/^\S+@\S+$/.test(value)) {
            return t("form.validate.email");
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
        label="Почта"
        placeholder="Введите почту"
        {...form.getInputProps("email")}
      />
      <PasswordInput
        label={t("loginForm.password.label")}
        placeholder={t("loginForm.password.placeholder")}
        mt="md"
        withAsterisk
        {...form.getInputProps("password")}
      />
      {/* <Group position="apart" mt="lg">
        <Anchor component="button" size="sm" onClick={() => navigate("new")}>
          {t("loginForm.firstEntry")}
        </Anchor>
      </Group> */}

      <Button type="submit" fullWidth mt="md">
        {t("loginForm.submitButton")}
      </Button>
    </form>
  );
}
