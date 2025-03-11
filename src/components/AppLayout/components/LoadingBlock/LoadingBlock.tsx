import { LoadingOverlay } from "@mantine/core";

interface LoadingBlockProps {
  isLoading: boolean;
}
export function LoadingBlock({ isLoading }: LoadingBlockProps) {
  return (
    <LoadingOverlay
      visible={isLoading}
      loaderProps={{ variant: "dots", size: "md" }}
      overlayBlur={2}
    />
  );
}
