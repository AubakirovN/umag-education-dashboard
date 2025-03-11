import {
  Box,
  Progress,
  PasswordInput,
  Group,
  Text,
  Center,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { getStrength, getPasswordRequirements } from "./passwordUtils";

type PasswordChangeCallback = (newValue: string) => void;

interface PasswordStrengthProps {
  onPasswordChange?: PasswordChangeCallback;
}

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text color={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size="0.9rem" stroke={1.5} />
        ) : (
          <IconX size="0.9rem" stroke={1.5} />
        )}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

export function PasswordStrength({ onPasswordChange }: PasswordStrengthProps) {
  const { t } = useTranslation(["translation", "auth"]);
  const passwordRequirements = getPasswordRequirements(t);
  const [value, setValue] = useInputState("");
  const strength = getStrength(value, t);
  const checks = passwordRequirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));
  const bars = Array(7)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: "0ms" } }}
        value={
          value.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 7) * 100
            ? 100
            : 0
        }
        color={strength > 90 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={5}
      />
    ));
  return (
    <div>
      <PasswordInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (typeof onPasswordChange === "function")
            onPasswordChange(e.target.value);
        }}
        placeholder={`${t("auth:loginForm.password.example")}: Abc12!`}
        label={t("auth:loginForm.password.newPass")}
      />

      <Group spacing={5} grow mt="xs" mb="md">
        {bars}
      </Group>
      {strength !== 100 ? (
        <>
          <PasswordRequirement
            label={t("auth:loginForm.password.errors.length")}
            meets={value.length > 5}
          />
          {checks}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
