import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { CustomModal } from "@/components/CustomModal";
import { createSublesson, getLessons } from "@/core/api";
import { Box, Button, Flex, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { BaseCKEditor } from "../CKEditor/BaseCKEditor";
import { AsyncSelect } from "@/components/AsyncSelect";
import { MRT_PaginationState } from "mantine-react-table";

interface AddSublessonModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export const AddSublessonModal = ({
  open,
  onClose,
  setChanges,
}: AddSublessonModalProps) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [lesson, setLesson] = useState();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: any = {
    title: "",
    description: "",
    video_url: "",
    lesson_id: id ? id : '',
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
      await createSublesson(values);
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
    const lessons = await getLessons(params);
    return {
      options:
        lessons?.data?.map((item: any) => ({
          value: item.id,
          label: item.title,
        })) ?? [],
      hasMore: lessons?.current_page < lessons?.last_page ? true : false,
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

  console.log(form.values)
  const handleLessonChange = (e: any) => {
    setLesson(e);
    form.setFieldValue('lesson_id', e.value)
  }

  return (
    <CustomModal
      opened={open}
      onClose={close}
      title="Создание темы"
      scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box maw={500} mx="auto">
          <Flex direction="column" gap={10}>
            <TextInput
              label="Название темы"
              placeholder="Введите название"
              {...form.getInputProps("title")}
              withAsterisk
            />
            {!id && (
              <AsyncSelect
                w="100%"
                mah={300}
                error={form.errors.lesson_id}
                value={lesson || ''}
                label="Урок"
                placeholder="Выберите урок"
                search={search}
                isClearable
                onChange={handleLessonChange}
                loadOptions={loadOptions}
                handleSearchChange={handleSearchChange}
              />
            )}
            <Text fz={14}>
              Описание <span style={{ color: "#fa5252" }}>*</span>
            </Text>
            <Flex mt={10}>
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
            </Flex>
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
