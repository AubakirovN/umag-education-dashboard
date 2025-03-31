import { Anchor, Breadcrumbs, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Users } from "../../components/Users";

const UsersPage = () => {
  const { t } = useTranslation();
  const items = [
    { title: t("breadcrumbs.main"), href: "/app" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <Stack>
      <Title order={1}>{t("appNavbar.users")}</Title>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Users />
    </Stack>
  );
};

export default UsersPage;
