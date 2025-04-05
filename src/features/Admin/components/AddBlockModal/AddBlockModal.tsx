import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { AsyncSelect } from "@/components/AsyncSelect";
import { CustomModal } from "@/components/CustomModal";
import { createBlock, getCourses } from "@/core/api";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_PaginationState } from "mantine-react-table";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface AddBlockModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export const AddBlockModal = ({
  open,
  onClose,
  setChanges,
}: AddBlockModalProps) => {
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
    number: 0,
    course_id: id || "",
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
    form.reset();
    onClose();
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await createBlock(values);
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

  return (
    <CustomModal
      opened={open}
      onClose={close}
      title={t("blocks.modal.blockCreating")}
      scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)} className="wws">
        <Box maw={500} mx="auto">
          <TextInput
            label={t("blocks.modal.title")}
            placeholder={t("blocks.modal.enterTitle")}
            {...form.getInputProps("title")}
            withAsterisk
          />
          <TextInput
            type="number"
            label={t("blocks.modal.number")}
            placeholder={t("blocks.modal.enterNumber")}
            {...form.getInputProps("number")}
            withAsterisk
          />
          <TextInput
            label={t("blocks.modal.description")}
            placeholder={t("blocks.modal.enterDescription")}
            {...form.getInputProps("description")}
            withAsterisk
          />
          {!id && (
            <AsyncSelect
              w="100%"
              mah={500}
              error={form.errors.course_id}
              label={t("blocks.modal.course")}
              placeholder={t("blocks.modal.chooseCourse")}
              search={search}
              isClearable
              onChange={(option: any) => {
                form.setFieldValue("course_id", option?.value || "");
              }}
              loadOptions={loadOptions}
              handleSearchChange={handleSearchChange}
            />
          )}
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
            <Button type="submit">{t("buttons.create")}</Button>
          </Group>
        </Box>
      </form>
      <LoadingBlock isLoading={isLoading} />
    </CustomModal>
  );
};
