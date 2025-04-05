import { Anchor, Breadcrumbs, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Tests } from "../../components/Tests";

const TestsPage = () => {
  const { t } = useTranslation();
  const items = [
    { title: t("breadcrumbs.main"), href: "/app" },
    { title: t("breadcrumbs.tests"), href: "/app/tests" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <Stack>
      <Title order={1}>{t("appNavbar.tests")}</Title>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Tests />
    </Stack>
  );
};

export default TestsPage;
