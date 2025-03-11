import { Text, Container } from "@mantine/core";
import { useStyles } from "./styles.tsx";
import { Logo, LogoType } from "../../../Logo/Logo.tsx";

export function GuestFooter() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.afterFooter}>
        <Logo type={LogoType.light} />
        <Text size={18} color="#808080">
          Copyright Ⓒ 2025 . All rights reserved
        </Text>
      </Container>
    </footer>
  );
}
