import { LoadingBlock } from "@/components/AppLayout/components/LoadingBlock";
import { UserPermissionsOutputDto } from "@/core/types";
import { getEntityLabel } from "@/core/utils/getEntityLabel";
import { LoginUserCard } from "@/features/Auth/components/LoginUserCard";
import { RootState } from "@/store";
import { Flex, Modal, ScrollArea, Text } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface LoginAsProps {
  open: boolean;
  close: () => void;
}

export const LoginAsModal = ({ open, close }: LoginAsProps) => {
  const { t } = useTranslation(["translation", "auth"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const permissions = useSelector(
    (state: RootState) => state.permissions.permissions
  );
  return (
    <Modal
      size="40%"
      centered
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      onClose={close}
      title={<Text fw={700} size={40}>{t("auth:loginForm.loginAs")}</Text>}
      opened={open}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Flex direction="column">
        <Text size={16} lh={1.3}>
          {t("auth:loginForm.loginAsText")}
        </Text>
        {permissions?.map((permission: UserPermissionsOutputDto) => (
          <LoginUserCard
            close={close}
            key={permission.id}
            avatar="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            permission={permission}
            entity={getEntityLabel(permission)}
            setIsLoading={setIsLoading}
          />
        ))}
      </Flex>
      <LoadingBlock isLoading={isLoading} />
    </Modal>
  );
};
