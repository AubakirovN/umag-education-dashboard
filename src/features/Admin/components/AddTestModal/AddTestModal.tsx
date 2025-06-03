import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { CustomModal } from "@/components/CustomModal";
import { createTest, getCourseBlocks } from "@/core/api";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { IconTrash } from "@tabler/icons-react";
import { randomId } from "@mantine/hooks";
import { AsyncSelect } from "@/components/AsyncSelect";
import { MRT_PaginationState } from "mantine-react-table";

interface AddTestModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export const AddTestModal = ({
  open,
  onClose,
  setChanges,
}: AddTestModalProps) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [courseBlocks, setCourseBlocks] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: any = {
    question: "",
    is_correct: null,
    answers: [{ name: "", is_correct: false, key: randomId() }],
    course_block_ids: id ? [id] : [],
  };

  const form: UseFormReturnType<any> = useForm({
    initialValues: initialValues,
    validateInputOnBlur: true,
    validateInputOnChange: true,
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
      is_correct: () => {
        const hasCorrect: boolean = form.values.answers?.some(
          (item: any) => item.is_correct === true
        );
        return hasCorrect ? null : true;
      },
    },
  });

  const close = () => {
    form.reset();
    onClose();
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

  const handleSubmit = async (values: any) => {
    delete values.is_correct;
    setIsLoading(true);
    try {
      await createTest(values);
      close();
      setChanges((prev) => !prev);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlocksChange = (option: any) => {
    form.setFieldValue(
      "course_block_ids",
      option.map((opt: any) => opt.value)
    );
    setCourseBlocks(option);
  };

  const fields = form.values.answers?.map((item: any, i: number) => {
    const index = form.values.answers?.findIndex(
      (el: any) => el.key === item.key
    );
    return (
      <Group key={item.key} mt="xs">
        <TextInput
          name={`answers.${index}.name`}
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
          error={form.errors.is_correct}
          onChange={(e) => {
            form.setFieldValue(`answers.${index}.is_correct`, e.target.checked);
            form.clearFieldError("is_correct");
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
    <CustomModal opened={open} onClose={close} title="Создание теста">
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
          {!id && (
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
          )}
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
