import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { AsyncSelect } from "@/components/AsyncSelect";
import { CustomModal } from "@/components/CustomModal";
import { createCourse, getRoles } from "@/core/api";
import { formatYMDHM } from "@/core/format";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { MRT_PaginationState } from "mantine-react-table";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseCKEditor } from "../CKEditor/BaseCKEditor";

interface AddCourseModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export const AddCourseModal = ({
  open,
  onClose,
  setChanges,
}: AddCourseModalProps) => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: any = {
    title: "",
    description: "",
    role_ids: [],
    deadline: "",
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
      role_ids: (value) => {
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
    const roles = await getRoles(params);
    return {
      options:
        roles?.data?.map((item: any) => ({
          value: item.id,
          label: item.name,
        })) ?? [],
      hasMore: roles?.current_page < roles?.last_page ? true : false,
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

  const handleRolesChange = (option: any) => {
    console.log(option);
    form.setFieldValue(
      "role_ids",
      option.map((opt: any) => opt.value)
    );
    setRoles(option);
  };

  const handleSubmit = async (values: any) => {
    if (!values?.deadline) {
      delete values?.deadline;
    }

    setIsLoading(true);
    try {
      await createCourse(values);
      close();
      setChanges((prev) => !prev);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal
      opened={open}
      onClose={close}
      title={t("courses.modal.courseCreating")}
      scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)} className="wws">
        <Box maw={500} mx="auto">
          <TextInput
            label={t("courses.modal.title")}
            placeholder={t("courses.modal.enterTitle")}
            {...form.getInputProps("title")}
            withAsterisk
          />
          <Text fz={14}>
            Описание курса <span style={{ color: "#fa5252" }}>*</span>
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
          <AsyncSelect
            w="100%"
            mah={300}
            value={roles}
            error={form.errors.role_ids}
            label="Роль"
            placeholder="Выберите роль"
            search={search}
            isMulti
            isClearable
            onChange={handleRolesChange}
            loadOptions={loadOptions}
            handleSearchChange={handleSearchChange}
          />
          <DateTimePicker
            label={t("courses.modal.deadline")}
            placeholder={t("courses.modal.enterDeadline")}
            onChange={(e: any) => {
              form.setFieldValue("deadline", formatYMDHM(e));
            }}
            error={form.errors.deadline}
            // withAsterisk
            mx="auto"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
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
