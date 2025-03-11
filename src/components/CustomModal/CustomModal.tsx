import { Modal, ScrollArea, createStyles } from "@mantine/core";
import { ReactNode } from "react";

const useStyles = createStyles(() => ({
  overflow: {
    overflowY: "visible",
  },
}));
export interface CustomModalProps {
  onClose: () => void;
  title: string;
  opened: boolean;
  size?: string | number;
  children: ReactNode;
  scrolling?: boolean;
}

export function CustomModal({
  onClose,
  title,
  opened,
  children,
  size,
  scrolling
}: CustomModalProps) {
  const { classes } = useStyles();
  return (
    <Modal
      classNames={{ content: classes.overflow }}
      size={size}
      fullScreen={true}
      styles={{
        inner: {
          width: '900px',
          maxWidth: '100%',
          right: 0
        }
      }}
      transitionProps={{
        transition: 'slide-left'
      }}
      closeOnClickOutside={false}
      onClose={onClose}
      title={title}
      opened={opened}
      scrollAreaComponent={!scrolling ? ScrollArea.Autosize : undefined}
    >
      {children}
    </Modal>
  );
}
