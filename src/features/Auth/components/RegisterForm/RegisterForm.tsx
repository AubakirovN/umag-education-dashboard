import { PasswordStrength } from "@/components/PasswordStrength";
import { RegisterDto } from "@/core/types";
import {
  Button,
  Flex,
  InputBase,
  // PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";

export interface RegisterFormProps {
  onSubmit: (values: RegisterDto) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const { t } = useTranslation("auth");

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },

    validate: {
      name: (value) => {
        if (value.length < 1) {
          return t("errors.required");
        } else {
          return null;
        }
      },
      email: (value) => {
        if (value) {
          if (!/^\S+@\S+$/.test(value)) {
            return t("form.validate.email");
          } else {
            return null;
          }
        } else {
          return t("errors.required");
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
      phone: (value) => {
        if (!value) {
          return t("errors.required");
        } else if (value && !/^\+7 \(\d{3}\) \d{3}-\d{4}$/.test(value)) {
          return t("form.validate.phoneNumber");
        } else {
          return null;
        }
      },
    },
  });
  const handlePasswordChange = (newValue: string) => {
    form.setFieldValue("password", newValue);
  };

  const handleNumber = (value: string) => {
    form.setFieldValue("phone", value);
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
      })}
    >
      <TextInput
        label={t("loginForm.fio")}
        placeholder={t("loginForm.enterFio")}
        {...form.getInputProps("name")}
        withAsterisk
      />
      <TextInput
        label={t("loginForm.email")}
        placeholder={t("loginForm.enterEmail")}
        {...form.getInputProps("email")}
        withAsterisk
      />
      <InputBase
        label={t("loginForm.phone")}
        {...form.getInputProps("phone")}
        onAccept={(value: string) => handleNumber(value)} // <-- важно
        component={IMaskInput}
        placeholder="+7 (XXX) XXX-XXXX"
        mask="+7 (000) 000-0000"
        withAsterisk
      />
      <PasswordStrength onPasswordChange={handlePasswordChange} />
      {/* <PasswordInput
        label={t("loginForm.password.confirmNewPass")}
        placeholder={t("loginForm.password.confirmNewPass")}
        mt="md"
        withAsterisk
        {...form.getInputProps("passwordRepeat")}
      /> */}
      <Flex justify="space-between">
        <Button type="submit" mt="xl">
          {t("loginForm.submitButton")}
        </Button>
      </Flex>
    </form>
  );
}
