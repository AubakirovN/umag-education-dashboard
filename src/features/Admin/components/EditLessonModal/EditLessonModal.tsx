import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { AsyncSelect } from "@/components/AsyncSelect";
import { CustomModal } from "@/components/CustomModal";
import {
  editLesson,
  getCourseBlocks,
} from "@/core/api";
import { Box, Button, Flex, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_PaginationState } from "mantine-react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseCKEditor } from "../CKEditor/BaseCKEditor";

interface EditLessonModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
  lesson: any;
}

export const EditLessonModal = ({
  open,
  onClose,
  setChanges,
  lesson,
}: EditLessonModalProps) => {
  const { t } = useTranslation();
  // const { id } = useParams();
  const [courseBlocks, setCourseBlocks] = useState([]);
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
    course_block_ids: [],
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
      await editLesson(lesson?.id, values);
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
  const handleBlocksChange = (option: any) => {
    form.setFieldValue(
      "course_block_ids",
      option.map((opt: any) => opt.value)
    );
    setCourseBlocks(option);
  };

  useEffect(() => {
    if (open) {
      form.setValues({
        title: lesson?.title || "",
        description: lesson?.description || "",
        video_url: lesson?.video_url || "",
        course_block_ids:
          lesson?.course_blocks?.map((item: any) => item?.id) || [],
      });
      setCourseBlocks(
        lesson?.course_blocks?.map((item: any) => ({
          value: item?.id,
          label: item?.title,
        })) || []
      );
    }
  }, [open]);

  return (
    <CustomModal
      opened={open}
      onClose={close}
      title={t("lessons.modal.lessonEditting")}
      scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box maw={500} mx="auto">
          <TextInput
            label="Название урока"
            placeholder="Введите название"
            {...form.getInputProps("title")}
            withAsterisk
          />
          {/* {!id && ( */}
          <AsyncSelect
            w="100%"
            mah={300}
            value={courseBlocks}
            error={form.errors.course_block_ids}
            label={t("lessons.modal.courseBlock")}
            placeholder={t("lessons.modal.chooseCourseBlock")}
            isMulti
            search={search}
            isClearable
            onChange={handleBlocksChange}
            loadOptions={loadOptions}
            handleSearchChange={handleSearchChange}
          />
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
