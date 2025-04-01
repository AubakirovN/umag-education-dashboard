import {
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./styles.ts";
import { Link, useNavigate } from "react-router-dom";
import { Logo, LogoType } from "../../../Logo/Logo.tsx";

export function GuestHeader() {
  const navigate = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Link to={"/"}>
            <Logo type={LogoType.dark} />
          </Link>

          <Group className={classes.hiddenMobile}>
            <Link to={"/auth/login"}>
              <Button variant="default">Войти</Button>
            </Link>
            <Button onClick={() => navigate("/auth/register")}>
              Регистрация
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Меню"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Link to={"/auth/login"}>
              <Button variant="default">Войти</Button>
            </Link>
            <Button onClick={() => navigate("/auth/register")}>
              Регистрация
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
