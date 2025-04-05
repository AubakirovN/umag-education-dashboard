import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { CustomModal } from "@/components/CustomModal";
import { createLesson, getCourseBlocks } from "@/core/api";
import { Box, Button, Flex, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BaseCKEditor } from "../CKEditor/BaseCKEditor";
import { AsyncSelect } from "@/components/AsyncSelect";
import { MRT_PaginationState } from "mantine-react-table";

interface AddLessonModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export const AddLessonModal = ({
  open,
  onClose,
  setChanges,
}: AddLessonModalProps) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: any = {
    title: "",
    description: "",
    video_url: "",
    course_block_id: id || "",
  };

  const form = useForm({
    initialValues: initialValues,
    validateInputOnBlur: true,
    validate: {
      title: (value) => {
        if (!value) {
          return t("form.validate.required");
        } else {
          return null;
        }
      },
      // description: (value, values) => {
      //   if (!value && !values.video_url) {
      //     return t("form.validate.requiredDescriptionOrVideo");
      //   }
      //   return null;
      // },
      // video_url: (value, values) => {
      //   if (!value && !values.description) {
      //     return t("form.validate.requiredDescriptionOrVideo");
      //   }
      //   return null;
      // },
    },
  });

  const close = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await createLesson(values);
      close();
      setChanges((prev) => !prev);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadOptions = async () => {
    const params = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      search: search,
    };
    setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 });
    const blocks = await getCourseBlocks(params);
    return {
      options:
        blocks?.data?.map((item: any) => ({
          value: item.id,
          label: item.title,
        })) ?? [],
      hasMore: blocks?.current_page < blocks?.last_page ? true : false,
    };
  };

  const handleSearchChange = (inputValue: string) => {
    if (inputValue === "" && search?.length === 1) {
      setSearch("");
      setPagination({ ...pagination, pageIndex: 0 });
    } else {
      setPagination({ ...pagination, pageIndex: 0 });
      setSearch(inputValue);
    }
  };

  return (
    <CustomModal
      opened={open}
      onClose={close}
      title={t("lessons.modal.lessonCreating")}
      scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)} className="wws">
        <Box maw={500} mx="auto">
          <Flex direction="column" gap={10}>
            <TextInput
              label="Название урока"
              placeholder="Введите название"
              {...form.getInputProps("title")}
              withAsterisk
            />
            {!id && (
              <AsyncSelect
                w="100%"
                mah={500}
                error={form.errors.course_block_id}
                label={t("lessons.modal.courseBlock")}
                placeholder={t("lessons.modal.chooseCourseBlock")}
                search={search}
                isClearable
                onChange={(option: any) => {
                  form.setFieldValue("course_block_id", option?.value || "");
                }}
                loadOptions={loadOptions}
                handleSearchChange={handleSearchChange}
              />
            )}
            {/* <Text fz={14}>
              Описание <span style={{ color: "#fa5252" }}>*</span>
            </Text> */}
            <BaseCKEditor
              onChange={(e) => {
                form.setFieldValue("description", e.editor.getData());
              }}
              initData={form.values.description}
              style={{
                border: form.errors.description
                  ? "1px solid #fa5252"
                  : "1px solid #d1d1d1",
              }}
            />
            <TextInput
              label="Видео"
              placeholder="Введите ссылку"
              {...form.getInputProps("video_url")}
              // withAsterisk
            />
          </Flex>
          <Group m="md" spacing="xs" position="right">
            <Button color="red" onClick={close}>
              {t("buttons.cancel")}
            </Button>
            <Button type="submit">{t("buttons.create")}</Button>
          </Group>
        </Box>
      </form>
      <LoadingBlock isLoading={isLoading} />
    </CustomModal>
  );
};
