import { useCallback } from "react";
import {
  ActionIcon,
  // Flex,
  Menu,
  Navbar,
  ScrollArea,
  Stack,
  // Text,
} from "@mantine/core";
import { useStyles } from "../styles.ts";
import { appNavbarCategories } from "./links.ts";
import { LinksGroup } from "../../NavbarLinksGroup/index.ts";
import { UserButton } from "../../UserButton/index.ts";
import {
  // IconArrowsLeftRight,
  // IconCheck,
  IconChevronLeft,
  IconLogout,
  // IconPhoto,
  // IconTrash,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../LanguageSwitcher/LanguageSwitcher.tsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store.ts";
import { resetAll } from "@/slice/resetAction.tsx";
import { toggleAppNavbar } from "@/slice/settingsSlice/settingsSlice.tsx";

export function AppNavbar() {
  const { t } = useTranslation(["translation", "auth"]);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const getLinks = () => {
    // if (curPermission?.id) {
    //   return appNavbarCategories
    //     .filter((link) =>
    //       link.permission.some(
    //         (item) =>
    //           item.entityName === curPermission.entityName &&
    //           item.level === curPermission.level
    //       )
    //     )
    //     .map((item) => <LinksGroup {...item} key={item.translationKey} />);
    // } else {
      return appNavbarCategories.map((item) => (
        <LinksGroup {...item} key={item.translationKey} />
      ));
    // }
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch(resetAll());
    navigate("/auth/login");
  };

  const handleLogout = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      logout();
    },
    []
  );

  return (
    <Navbar width={{ sm: 300 }} p="md" className={`${classes.navbar}`}>
      <Navbar.Section className={classes.hoverBlock}>
        <Stack pos="relative">
          <ActionIcon
            className={classes.navbarToggler}
            left={273}
            top={78}
            variant="outline"
            size="sm"
            onClick={() => dispatch(toggleAppNavbar())}
          >
            <IconChevronLeft size="1rem" />
            <div className={classes.hoverText}>
              {t("appNavbar.toggler.hide")}
            </div>
          </ActionIcon>
        </Stack>
      </Navbar.Section>
      <Navbar.Section className={classes.header}>
        <Menu position="right-start" withArrow>
          <Menu.Target>
            <Stack>
              <UserButton
                image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                name={user?.name}
                email={user?.email}
                phone={user?.phone}
                role={user?.role}
              />
            </Stack>
          </Menu.Target>
        </Menu>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{getLinks()}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer} p="md">
        <LanguageSwitcher />
        <a href="#" className={classes.link} onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>{t("auth:logout")}</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
