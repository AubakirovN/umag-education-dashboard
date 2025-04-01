import { Button, Flex } from "@mantine/core";
import { useState } from "react";
import { AddUserModal } from "./AddUserModal";

export const Users = () => {
  const [addModal, setAddModal] = useState(false);
  
  return (
    <>
      <Flex justify="flex-end">
        <Button variant="subtle" onClick={() => setAddModal(true)}>
          + Добавить пользователя
        </Button>
      </Flex>
      <AddUserModal modal={addModal} onClose={() => setAddModal(false)} />
    </>
  );
};
