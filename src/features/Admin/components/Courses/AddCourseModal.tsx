import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { CustomModal } from "@/components/CustomModal";
import { createCourse } from "@/core/api";
import { formatYMDHM } from "@/core/format";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: any = {
    title: "",
    description: "",
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

  const handleSubmit = async (values: any) => {
    console.log(values);
    if (!values?.deadline) {
      delete values?.deadline;
    }

    setIsLoading(true);
    try {
      await createCourse(values);
      close();
      setChanges((prev) => !prev);
    } catch (e) {
      console.log(e);
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
          <TextInput
            label={t("courses.modal.description")}
            placeholder={t("courses.modal.enterDescription")}
            {...form.getInputProps("description")}
            withAsterisk
          />
          <DateTimePicker
            label={t("courses.modal.deadline")}
            placeholder={t("courses.modal.enterDeadline")}
            onChange={(e: any) => {
              form.setFieldValue("deadline", formatYMDHM(e));
            }}
            error={form.errors.deadline}
            withAsterisk
            mx="auto"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <Group m="md" spacing="xs" position="right">
            <Button color="red" onClick={() => onClose}>
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
