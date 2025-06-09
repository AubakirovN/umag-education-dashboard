import { Anchor, Breadcrumbs, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Sublessons } from "../../components/Sublessons";

const SublessonsPage = () => {
  const { t } = useTranslation();
  const items = [
    { title: t("breadcrumbs.main"), href: "/app" },
    { title: "Темы", href: "/app/sublessons" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <Stack>
      <Title order={1}>Темы</Title>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Sublessons />
    </Stack>
  );
};

export default SublessonsPage;
