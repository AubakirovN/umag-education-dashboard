import { Anchor, Breadcrumbs, Flex, List, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTest } from "@/core/api";
import { IconCheck } from "@tabler/icons-react";

const TestPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [test, setTest] = useState<any>();
  const items = [
    { title: t("breadcrumbs.main"), href: "/app" },
    { title: t("breadcrumbs.tests"), href: `/app/tests` },
    { title: t("breadcrumbs.question"), href: `#` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  const getData = async () => {
    const response = await getTest(id as string);
    setTest(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {test?.id && (
        <Stack>
          <Breadcrumbs>{items}</Breadcrumbs>
          <Title order={1}>{test?.question}</Title>
          <List>
            {test?.answers
              ? JSON.parse(test?.answers)?.map((item: any, index: number) => (
                  <List.Item>
                    <Flex key={index} align="center">
                      {item?.name}{" "}
                      {item?.is_correct && <IconCheck color="green" />}
                    </Flex>
                  </List.Item>
                ))
              : ""}
          </List>
        </Stack>
      )}
    </>
  );
};

export default TestPage;
