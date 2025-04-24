import { Anchor, Breadcrumbs, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Roles } from "../../components/Roles";

const RolesPage = () => {
  const { t } = useTranslation();
  const items = [
    { title: t("breadcrumbs.main"), href: "/app" },
    { title: t("breadcrumbs.roles"), href: "/app/roles" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <Stack>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Title order={1}>{t("appNavbar.roles")}</Title>
      <Roles />
    </Stack>
  );
};

export default RolesPage;
