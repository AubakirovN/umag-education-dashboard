import { AsyncSelect } from "@/components/AsyncSelect";
import { CustomModal } from "@/components/CustomModal";
import { addUser, getRoles } from "@/core/api";
import { Button, Group, InputBase } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MRT_PaginationState } from "mantine-react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";

interface IAddUserModal {
  modal: boolean;
  onClose: () => void;
  setChanges: any;
}

export const AddUserModal = ({ modal, onClose, setChanges }: IAddUserModal) => {
  const { t } = useTranslation();

  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  const close = () => {
    setRoles([]);
    form.reset();
    onClose();
  };
  const initialUserValues: any = {
    phone: "",
    role_id: "",
  };
  const form = useForm({
    initialValues: initialUserValues,
    validateInputOnBlur: true,
    validate: {
      role_id: (value) => {
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
  };

  const handleSubmit = async (values: any) => {
    try {
      await addUser(values).then(() => {
        close();
        setChanges((prev: any) => !prev);
      });
    } catch (e) {
      console.error(e);
    }
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
    form.setFieldValue("role_id", option?.value);
    setRoles(option);
  };

  return (
    <CustomModal
      onClose={close}
      title={t("users.addModal.title")}
      opened={modal}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <AsyncSelect
          w="100%"
          mah={150}
          value={roles}
          error={form.errors.role_id}
          label="Роль"
          placeholder="Выберите роль"
          search={search}
          isClearable
          onChange={handleRolesChange}
          loadOptions={loadOptions}
          handleSearchChange={handleSearchChange}
        />
        <InputBase
          label={t("users.addModal.phone")}
          {...form.getInputProps("phone")}
          onAccept={(value: string) => handleNumber(value)} // <-- важно
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
