import { FileButton, Button, Flex } from "@mantine/core";
import { useState } from "react";
import { importUsers } from "@/core/api";
import { CustomModal } from "@/components/CustomModal";

interface IImportUserModal {
  modal: boolean;
  onClose: () => void;
}

export const ImportUserModal = ({ modal, onClose }: IImportUserModal) => {
  const [file, setFile] = useState<File | null>(null);

  const closeModal = () => {
    onClose();
    setFile(null);
  };

  const handleImport = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await importUsers(file);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CustomModal
      opened={modal}
      onClose={closeModal}
      title="Импорт пользователей"
    >
      <Flex direction="column">
        <Flex direction="column">
          {file?.name}
          <Flex gap="md" align="center">
            <FileButton onChange={setFile} accept=".csv">
              {(props) => <Button {...props}>Загрузить CSV</Button>}
            </FileButton>
            {file && <Button onClick={handleImport}>Отправить</Button>}
          </Flex>
        </Flex>
      </Flex>
    </CustomModal>
  );
};
