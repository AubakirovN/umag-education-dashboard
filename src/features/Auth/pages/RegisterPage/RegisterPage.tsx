import { Paper, Title, Container, Alert } from "@mantine/core";

import { useTranslation } from "react-i18next";
import { register } from "@/core/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { RegisterDto } from "@/core/types";
import { RegisterForm } from "../../components/RegisterForm";

export function RegisterPage() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState(false);

  const handleRegister = async (values: RegisterDto) => {
    setIsLoading(true);
    try {
      await register(values);
      navigate("/auth/login");
      setErr(false);
    } catch (e) {
      console.error(e);
      setErr(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        {t("registerPageTitle")}
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {err ? (
          <Alert
            icon={<IconAlertCircleFilled size="1rem" />}
            title={t("loginForm.errors.title")}
            color="red"
            mb="lg"
          >
            {t("loginForm.errors.invalidCredentials")}
          </Alert>
        ) : null}
        <RegisterForm onSubmit={handleRegister} />
      </Paper>
      <LoadingBlock isLoading={isLoading} />
    </Container>
  );
}
