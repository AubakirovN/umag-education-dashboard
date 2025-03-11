import { Anchor, Breadcrumbs, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const items = [
    { title: t("breadcrumbs.admin"), href: "#" },
    { title: t("breadcrumbs.main"), href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <Stack>
      <Title order={1}>{t("breadcrumbs.main")}</Title>
      <Breadcrumbs>{items}</Breadcrumbs>
      <div>Home Page</div>
    </Stack>
  );
};

export default HomePage;
