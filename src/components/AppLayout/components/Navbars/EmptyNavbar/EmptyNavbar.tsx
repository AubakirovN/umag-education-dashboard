import { ActionIcon, Navbar } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useStyles } from "../styles";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toggleAppNavbar } from "@/slice/settingsSlice/settingsSlice";

export function EmptyNavbar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  return (
    <Navbar width={{ sm: 30 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.hoverBlock}>
        <ActionIcon
          className={classes.navbarToggler}
          left={6}
          top={78}
          variant="outline"
          size="sm"
          onClick={() => dispatch(toggleAppNavbar())}
        >
          <IconChevronRight size="1rem" />
          <div className={classes.hoverText}>{t("appNavbar.toggler.show")}</div>
        </ActionIcon>
      </Navbar.Section>
    </Navbar>
  );
}
