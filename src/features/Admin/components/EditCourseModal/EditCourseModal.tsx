import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { CustomModal } from "@/components/CustomModal";
import { editCourse } from "@/core/api";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: any = {
    title: "",
    description: "",
    deadline: null,
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
    },
  });

  const close = () => {
    onClose();
    form.reset();
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
      });
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
          <TextInput
            label={t("courses.modal.description")}
            placeholder={t("courses.modal.enterDescription")}
            {...form.getInputProps("description")}
            withAsterisk
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
