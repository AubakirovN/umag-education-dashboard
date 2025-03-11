import { Loader, Stack } from "@mantine/core";

export function Loading() {
  return (
    <Stack w="100%" h="100%" justify="center" align="center">
      <Loader variant="dots" size="md" />
    </Stack>
  );
}
