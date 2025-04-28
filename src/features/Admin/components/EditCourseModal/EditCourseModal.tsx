import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { AsyncSelect } from "@/components/AsyncSelect";
import { CustomModal } from "@/components/CustomModal";
import { editCourse, getRoles } from "@/core/api";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { MRT_PaginationState } from "mantine-react-table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseCKEditor } from "../CKEditor/BaseCKEditor";

interface EditCourseModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
  course: any;
}

export const EditCourseModal = ({
  open,
  onClose,
  setChanges,
  course,
}: EditCourseModalProps) => {
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
    deadline: null,
    role_ids: [],
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
      role_ids: (value) => {
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
    const formattedDeadline = dayjs(values.deadline).format("YYYY-MM-DD HH:mm");
    const payload = {
      ...values,
      deadline: formattedDeadline,
    };

    setIsLoading(true);
    try {
      await editCourse(course?.id, payload);
      close();
      setChanges((prev) => !prev);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      form.setValues({
        title: course?.title,
        description: course?.description,
        deadline: dayjs(course.deadline, "YYYY-MM-DD HH:mm").toDate(),
        role_ids: course?.roles?.map((item: any) => item?.id) || [],
      });
      setRoles(
        course?.roles?.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })) || []
      );
    }
  }, [open]);

  return (
    <CustomModal
      opened={open}
      onClose={close}
      title={t("courses.modal.courseEditting")}
      scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
            value={form.values.deadline}
            label={t("courses.modal.deadline")}
            placeholder={t("courses.modal.enterDeadline")}
            onChange={(date: any) => {
              form.setFieldValue("deadline", date);
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
            <Button type="submit">{t("buttons.edit")}</Button>
          </Group>
        </Box>
      </form>
      <LoadingBlock isLoading={isLoading} />
    </CustomModal>
  );
};
