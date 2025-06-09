import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { AsyncSelect } from "@/components/AsyncSelect";
import { CustomModal } from "@/components/CustomModal";
import {
  editSublesson,
  getLessons,
} from "@/core/api";
import { Box, Button, Flex, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_PaginationState } from "mantine-react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseCKEditor } from "../CKEditor/BaseCKEditor";

interface EditSublessonModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
  sublesson: any;
}

export const EditSublessonModal = ({
  open,
  onClose,
  setChanges,
  sublesson,
}: EditSublessonModalProps) => {
  const { t } = useTranslation();
  // const { id } = useParams();
  const [lesson, setLesson] = useState<any>();
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
    lesson: "",
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
    },
  });

  const close = () => {
    onClose();
    form.reset();
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await editSublesson(sublesson?.id, values);
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
  const handleLessonChange = (option: any) => {
    setLesson(option);
    form.setFieldValue("lesson_id", option?.value);
  };

  useEffect(() => {
    if (open) {
      form.setValues({
        title: sublesson?.title || "",
        description: sublesson?.description || "",
        video_url: sublesson?.video_url || "",
        lesson_id: sublesson?.lesson_id || "",
      });
      setLesson({value: sublesson?.lesson_id, label: sublesson?.lesson?.title});
    }
  }, [open]);

  return (
    <CustomModal
      opened={open}
      onClose={close}
      title="Редактирование темы"
      scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box maw={500} mx="auto">
          <TextInput
            label="Название темы"
            placeholder="Введите название"
            {...form.getInputProps("title")}
            withAsterisk
          />
          {/* {!id && ( */}
          <AsyncSelect
            w="100%"
            mah={300}
            value={lesson}
            error={form.errors.lesson_id}
            label="Урок"
            placeholder="Выберите урок"
            search={search}
            isClearable
            onChange={handleLessonChange}
            loadOptions={loadOptions}
            handleSearchChange={handleSearchChange}
          />
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
          <Group m="md" spacing="xs" position="right">
            <Button color="red" onClick={close}>
              {t("buttons.cancel")}
            </Button>
            <Button type="submit">{t("buttons.edit")}</Button>
          </Group>
        </Box>
      </form>
      <LoadingBlock isLoading={isLoading} />
    </CustomModal>
  );
};
