import { Button, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { AddUserModal } from "./AddUserModal";
import { getUsers } from "@/core/api";

export const Users = () => {
  const [addModal, setAddModal] = useState(false);

  const getData = async () => {
    const response = await getUsers();
    console.log(response);
  }

  useEffect(() => {
    getUsers();
  }, [])
  
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
