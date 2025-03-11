import { PasswordStrength, getStrength } from "@/components/PasswordStrength";
import { SetPasswordDto } from "@/core/types";
import { Button, Flex, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

export interface InitialLoginFormProps {
  onSubmit: (values: SetPasswordDto) => void;
  back: () => void;
}

export function InitialLoginForm({ onSubmit, back }: InitialLoginFormProps) {
  const { t } = useTranslation("auth");

  const form = useForm({
    initialValues: {
      iin: "",
      password: "",
      passwordRepeat: "",
    },

    validate: {
      iin: (value) => {
        if (!value) {
          return t("loginForm.iin.errors.required");
        }
        if (value.length !== 12) {
          return t("loginForm.iin.errors.length");
        }
        return null;
      },
      password: (value) => {
        if (!value) {
          return t("loginForm.password.errors.required");
        }
        const strength = getStrength(value, t);
        if (strength < 100) {
          return t("loginForm.password.errors.strength");
        }
        return null;
      },
      passwordRepeat: (value) => {
        if (!value) {
          return t("loginForm.password.errors.required");
        }
        if (value !== form.values.password) {
          return t("loginForm.password.errors.match");
        }
        return null;
      },
    },
  });
  const handlePasswordChange = (newValue: string) => {
    form.setFieldValue("password", newValue);
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
      })}
    >
      <TextInput
        label={t("loginForm.iin.label")}
        placeholder="010203123456"
        type="number"
        withAsterisk
        {...form.getInputProps("iin")}
        onInput={(e) => {
          const inputValue = (e.target as HTMLInputElement).value;
          if (inputValue.length > 12) {
            (e.target as HTMLInputElement).value = inputValue.slice(0, 12);
          }
        }}
      />
      <PasswordStrength onPasswordChange={handlePasswordChange} />
      <PasswordInput
        label={t("loginForm.password.confirmNewPass")}
        placeholder={t("loginForm.password.confirmNewPass")}
        mt="md"
        withAsterisk
        {...form.getInputProps("passwordRepeat")}
      />
      <Flex justify="space-between">
        <Button variant="subtle" mt="xl" onClick={back}>
          {t("loginForm.backButton")}
        </Button>
        <Button type="submit" mt="xl">
          {t("loginForm.submitButton")}
        </Button>
      </Flex>
    </form>
  );
}
