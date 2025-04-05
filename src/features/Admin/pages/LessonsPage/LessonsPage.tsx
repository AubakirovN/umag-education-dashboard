import { Anchor, Breadcrumbs, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Lessons } from "../../components/Lessons";

const LessonsPage = () => {
  const { t } = useTranslation();
  const items = [
    { title: t("breadcrumbs.main"), href: "/app" },
    { title: t("breadcrumbs.lessons"), href: "/app/lessons" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <Stack>
      <Title order={1}>{t("appNavbar.lessons")}</Title>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Lessons />
    </Stack>
  );
};

export default LessonsPage;
