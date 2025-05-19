import { Anchor, Breadcrumbs, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourse } from "@/core/api";
import { Course } from "../../components/Course";

const CoursePage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [course, setCourse] = useState<any>();
  const items = [
    { title: t("breadcrumbs.main"), href: "/app" },
    { title: t("breadcrumbs.courses"), href: "/app/courses" },
    { title: course?.title, href: `/app/courses/${id}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  const getData = async () => {
    const response = await getCourse(id as string);
    setCourse(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {course?.id && (
        <Stack>
          <Breadcrumbs>{items}</Breadcrumbs>
          <Title order={1}>{course?.title}</Title>
          <div dangerouslySetInnerHTML={{__html: course?.description}} />
          <Course />
        </Stack>
      )}
    </>
  );
};

export default CoursePage;
