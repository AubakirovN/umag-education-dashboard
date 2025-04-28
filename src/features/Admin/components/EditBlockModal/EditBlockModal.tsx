import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { AsyncSelect } from "@/components/AsyncSelect";
import { CustomModal } from "@/components/CustomModal";
import { editBlock, getCourses } from "@/core/api";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_PaginationState } from "mantine-react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseCKEditor } from "../CKEditor/BaseCKEditor";
import { useParams } from "react-router-dom";

interface EditBlockModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
  block: any;
}

export const EditBlockModal = ({
  open,
  onClose,
  setChanges,
  block,
}: EditBlockModalProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: any = {
    title: "",
    description: "",
    number: 0,
    course_ids: id ? [id] : [],
    max_attempts: 0,
    pass_count: 0,
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
      description: (value) => {
        if (!value) {
          return t("form.validate.required");
        } else {
          return null;
        }
      },
      number: (value) => {
        if (!value) {
          return t("form.validate.required");
        } else {
          return null;
        }
      },
      max_attempts: (value) => {
        if (!value) {
          return t("form.validate.required");
        } else {
          return null;
        }
      },
      pass_count: (value) => {
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
      await editBlock(block?.id, values);
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
    const courses = await getCourses(params);
    return {
      options:
        courses?.data?.map((item: any) => ({
          value: item.id,
          label: item.title,
        })) ?? [],
      hasMore: courses?.current_page < courses?.last_page ? true : false,
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
  const handleCoursesChange = (option: any) => {
    form.setFieldValue(
      "course_ids",
      option.map((opt: any) => opt.value)
    );
    setCourses(option);
  };

  useEffect(() => {
    if (open) {
      form.setValues({
        title: block?.title || "",
        description: block?.description || "",
        number: block?.number || 0,
        course_ids: block?.courses?.map((item: any) => item?.id) || [],
        max_attempts: block?.max_attempts || 0,
        pass_count: block?.pass_count || 0,
      });
      setCourses(
        block?.courses?.map((item: any) => ({
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
      title={t("blocks.modal.blockEditting")}
      // scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box maw={500} mx="auto">
          <TextInput
            label={t("blocks.modal.title")}
            placeholder={t("blocks.modal.enterTitle")}
            {...form.getInputProps("title")}
            withAsterisk
          />
          <Text fz={14}>
            Описание блока <span style={{ color: "#fa5252" }}>*</span>
          </Text>
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
          {!id && (
            <AsyncSelect
              w="100%"
              mah={300}
              value={courses}
              error={form.errors.course_ids}
              label={t("blocks.modal.course")}
              placeholder={t("blocks.modal.chooseCourse")}
              search={search}
              isMulti
              isClearable
              onChange={handleCoursesChange}
              loadOptions={loadOptions}
              handleSearchChange={handleSearchChange}
            />
          )}
          <TextInput
            type="number"
            label={t("blocks.modal.number")}
            placeholder={t("blocks.modal.enterNumber")}
            {...form.getInputProps("number")}
            withAsterisk
          />
          <TextInput
            type="number"
            label={t("blocks.modal.maxAttempts")}
            placeholder={t("blocks.modal.enterMaxAttempts")}
            {...form.getInputProps("max_attempts")}
            withAsterisk
          />
          <TextInput
            type="number"
            label={t("blocks.modal.passCount")}
            placeholder={t("blocks.modal.enterpassCount")}
            {...form.getInputProps("pass_count")}
            withAsterisk
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
