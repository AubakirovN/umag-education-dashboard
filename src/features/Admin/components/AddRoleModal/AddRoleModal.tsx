import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { CustomModal } from "@/components/CustomModal";
import { createCourse, createRole } from "@/core/api";
import { formatYMDHM } from "@/core/format";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

interface AddRoleModalProps {
  open: boolean;
  onClose: () => void;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export const AddRoleModal = ({
  open,
  onClose,
  setChanges,
}: AddRoleModalProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: any = {
    name: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validateInputOnBlur: true,
    validate: {
      name: (value) => {
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
      await createRole(values);
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
      title="Создание роли"
      scrolling
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box maw={500} mx="auto">
          <TextInput
            label="Название роли"
            placeholder="Введите название роли"
            {...form.getInputProps("name")}
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
