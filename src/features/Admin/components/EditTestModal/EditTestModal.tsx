import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { AsyncSelect } from "@/components/AsyncSelect";
import { CustomModal } from "@/components/CustomModal";
import { editTest, getCourseBlocks } from "@/core/api";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_PaginationState } from "mantine-react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";

interface EditTestModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
  test: any;
}

export const EditTestModal = ({
  open,
  onClose,
  setChanges,
  test,
}: EditTestModalProps) => {
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
    question: "",
    answers: [],
  };

  const form = useForm({
    initialValues: initialValues,
    validateInputOnBlur: true,
    validate: {
      question: (value) => {
        if (!value) {
          return t("form.validate.required");
        } else {
          return null;
        }
      },
      answers: (values: any) => {
        if (values.length < 1) {
          return t("form.validate.required");
        }
        const errors = values.map((item: any) => {
          if (!item.name.trim()) {
            return { name: t("form.validate.required") };
          } else if (item.name.trim().length > 100) {
            return { name: t("form.validate.maxLength") };
          }
          return null;
        });
        return errors.filter(Boolean).length > 0 ? errors : null;
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
      await editTest(test?.id, values);
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
        question: test?.question || "",
        answers: test?.answers ? JSON.parse(test?.answers) : [],
        course_block_ids:
          test?.course_blocks?.map((item: any) => item?.id) || [],
      });
      setCourseBlocks(
        test?.course_blocks?.map((item: any) => ({
          value: item?.id,
          label: item?.title,
        })) || []
      );
    }
  }, [open]);

  const fields = form.values.answers?.map((item: any, i: number) => {
    const index = form.values.answers?.findIndex(
      (el: any) => el.key === item.key
    );
    return (
      <Group key={item.key} mt="xs">
        <TextInput
          name={`answers.${index}.name`}
          value={form.values.answers?.[index]?.name}
          placeholder="Ответ"
          sx={{ flex: 20 }}
          onChange={(e) => {
            form.setFieldValue(`answers.${index}.name`, e.target.value);
          }}
          error={
            (!form.values.answers?.[index]?.name ||
              form.values.answers?.[index]?.name?.length > 100) &&
            (form.errors.answers as Array<{ name?: string } | null>)?.[index]
              ?.name
          }
          withAsterisk
        />
        <Checkbox
          sx={{ flex: 1 }}
          checked={form.values.answers?.[index]?.is_correct}
          onChange={(e) => {
            form.setFieldValue(`answers.${index}.is_correct`, e.target.checked);
          }}
        />
        <ActionIcon
          sx={{ flex: 1 }}
          color="red"
          disabled={form.values.answers?.length === 1}
          onClick={() => form.removeListItem("answers", i)}
        >
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    );
  });

  return (
    <CustomModal
      opened={open}
      onClose={close}
      title={t("tests.modal.testEditting")}
      scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box maw={500} mx="auto">
          <Flex direction="column" gap={10}>
            <TextInput
              label="Вопрос"
              placeholder="Введите вопрос"
              {...form.getInputProps("question")}
              withAsterisk
            />
            {fields}
          </Flex>
          <Group position="right" mt="md">
            <Button
              variant="subtle"
              onClick={() =>
                form.insertListItem("answers", {
                  name: "",
                  is_correct: false,
                  key: randomId(),
                })
              }
            >
              + Добавить ответ
            </Button>
          </Group>
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
          {/* )} */}
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
