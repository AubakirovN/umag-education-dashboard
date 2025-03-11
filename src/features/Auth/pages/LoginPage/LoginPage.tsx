import { Anchor, Paper, Title, Text, Container, Alert } from "@mantine/core";

import { LoginForm } from "../../components/LoginForm";
import { useTranslation } from "react-i18next";
import { getUserInfo, login } from "@/core/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { setUser } from "@/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoginAsModal } from "../../components/LoginAsModal";
import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { RootState } from "@/store";
import { LoginDto } from "@/core/types";

export function LoginPage() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState("");

  const handleLogin = async (values: LoginDto) => {
    try {
      setIsLoading(true);

    } catch (e: any) {
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
        {t("loginPageTitle")}
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
        <LoginForm onSubmit={handleLogin} />
      </Paper>
      <LoadingBlock isLoading={isLoading} />
    </Container>
  );
}
