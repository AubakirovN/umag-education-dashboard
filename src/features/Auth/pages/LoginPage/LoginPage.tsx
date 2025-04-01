import { Paper, Title, Container, Alert } from "@mantine/core";

import { LoginForm } from "../../components/LoginForm";
import { useTranslation } from "react-i18next";
import { getUserInfo, login } from "@/core/api";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconAlertCircleFilled } from "@tabler/icons-react";
// import { useDispatch } from "react-redux";
import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { LoginDto } from "@/core/types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/slice/userSlice";

export function LoginPage() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState(false);

  const handleLogin = async (values: LoginDto) => {
    setIsLoading(true);
    try {
      const response = await login(values);
      localStorage.setItem("accessToken", response?.data?.access_token);
      const user = await getUserInfo();
      dispatch(setUser(user))
      navigate("/app");
      setErr(false);
    } catch (e: any) {
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
