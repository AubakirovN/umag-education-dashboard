import { Anchor, Breadcrumbs, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLesson } from "@/core/api";

const LessonPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [lesson, setLesson] = useState<any>();
  const items = [
    { title: t("breadcrumbs.main"), href: "/app" },
    {
      title: t("breadcrumbs.lessons"),
      href: `/app/blocks/${lesson?.course_block_id}`,
    },
    { title: lesson?.title, href: `/app/blocks/${lesson?.id}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  const getData = async () => {
    const response = await getLesson(id as string);
    setLesson(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {lesson?.id && (
        <Stack>
          <Breadcrumbs>{items}</Breadcrumbs>
          <Title order={1}>{lesson?.title}</Title>
          <Text>
            <b>Описание: </b>
            {<span dangerouslySetInnerHTML={{ __html: lesson?.description }} />}
          </Text>
          <Text>
            <b>Ссылка на видео:</b>{" "}
            {lesson?.video_url ? (
              <Link to={lesson?.video_url} target="_blank">
                {lesson?.video_url}
              </Link>
            ) : (
              "-"
            )}
          </Text>
        </Stack>
      )}
    </>
  );
};

export default LessonPage;
