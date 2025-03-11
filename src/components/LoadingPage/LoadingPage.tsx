import { Flex, Loader } from "@mantine/core";

export function LoadingPage() {
  return (
    <Flex h="100vh" align="center" justify="center">
      <Loader variant="dots" size="xl" />
    </Flex>
  );
}
