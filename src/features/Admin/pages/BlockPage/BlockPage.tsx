import { Anchor, Breadcrumbs, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlock } from "@/core/api";
import { Block } from "../../components/Block";

const BlockPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [block, setBlock] = useState<any>();
  const items = [
    { title: t("breadcrumbs.main"), href: "/app" },
    { title: t("breadcrumbs.blocks"), href: `/app/courses/${block?.course_id}` },
    { title: block?.title, href: `/app/blocks/${block?.id}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  const getData = async () => {
    const response = await getBlock(id as string);
    setBlock(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {block?.id && (
        <Stack>
          <Breadcrumbs>{items}</Breadcrumbs>
          <Title order={1}>{block?.title}</Title>
          <div dangerouslySetInnerHTML={{__html: block?.description}} />
          <Text><b>Номер блока:</b> {block?.number}</Text>
          <Text><b>Количество попыток:</b> {block?.max_attempts}</Text>
          <Text><b>Проходной балл:</b> {block?.pass_count}</Text>
          <Block />
        </Stack>
      )}
    </>
  );
};

export default BlockPage;
