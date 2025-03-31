import { CustomModal } from "@/components/CustomModal";
import { addUser } from "@/core/api";
import { Button, Group, InputBase, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";

interface IAddUserModal {
  modal: boolean;
  onClose: () => void;
}

export const AddUserModal = ({ modal, onClose }: IAddUserModal) => {
  const { t } = useTranslation();
  const close = () => {
    form.reset();
    onClose();
  };
  const initialUserValues: any = {
    phone: "",
    role: "",
  };
  const form = useForm({
    initialValues: initialUserValues,
    validateInputOnBlur: true,
    validate: {
      role: (value) => {
        if (value.length < 1) {
          return t("form.validate.required");
        } else if (value.length > 100) {
          return t("form.validate.maxLength");
        } else {
          return null;
        }
      },
      phone: (value) => {
        if (value) {
          if (!/^\+\d{1} \(\d{3}\) \d{3}-\d{4}$/.test(value)) {
            return t("form.validate.phoneNumber");
          } else {
            return null;
          }
        } else {
          return t("form.validate.required");
        }
      },
    },
  });

  const handleNumber = (value: string) => {
    form.setFieldValue("phone", value);
    if (value.length <= 4) {
      form.setFieldValue("phone", "");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      await addUser(values).then(() => {
        close();
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CustomModal
      onClose={close}
      title={t("users.addModal.title")}
      opened={modal}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t("users.addModal.role")}
          placeholder={t("users.addModal.chooseRole")}
          {...form.getInputProps("role")}
        />
        <InputBase
          label={t("users.addModal.phone")}
          {...form.getInputProps("phone")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleNumber(e.target.value)
          }
          component={IMaskInput}
          error={form.errors.phone}
          placeholder="+7 (XXX) XXX-XXXX"
          mask="+7 (000) 000-0000"
          value={form.values.phone}
        />
        <Group m="md" spacing="xs" position="right">
          <Button color="red" onClick={() => close()}>
            {t("buttons.cancel")}
          </Button>
          <Button type="submit">{t("buttons.add")}</Button>
        </Group>
      </form>
    </CustomModal>
  );
};
