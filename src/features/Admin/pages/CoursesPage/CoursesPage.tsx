import { Anchor, Breadcrumbs, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Courses } from "../../components/Courses";

const CoursesPage = () => {
  const { t } = useTranslation();
  const items = [
    { title: t("breadcrumbs.main"), href: "/app" },
    { title: t("breadcrumbs.courses"), href: "/app/courses" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <Stack>
      <Title order={1}>{t("appNavbar.courses")}</Title>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Courses />
    </Stack>
  );
};

export default CoursesPage;
