import { useState } from "react";
import { Collapse, UnstyledButton, createStyles, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import { NavbarMenuItem } from "../NavbarMenuItem/NavbarMenuItem";
import { TablerIconsProps } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,
    textDecoration: "none",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

interface LinksGroupProps {
  icon: React.FC<TablerIconsProps>;
  translationKey: string;
  initiallyOpened?: boolean;
  children?: { translationKey: string; link: string }[];
  link?: string;
}

export function LinksGroup({
  icon: Icon,
  translationKey,
  initiallyOpened,
  children,
  link,
}: LinksGroupProps) {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const hasLinks = Array.isArray(children);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const items = (hasLinks ? children : []).map((link) => (
    <Link
      className={classes.link}
      to={link.link}
      key={link.translationKey}
    >
      {t(link.translationKey)}
    </Link>
  ));

  const menuItem = (
    <NavbarMenuItem
      icon={Icon}
      label={t(translationKey)}
      opened={opened}
      hasLinks={hasLinks}
    />
  );

  return (
    <>
      {hasLinks ? (
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.control}
        >
          {menuItem}
        </UnstyledButton>
      ) : null}

      {link ? (
        <Link className={classes.control} to={link}>
          {menuItem}
        </Link>
      ) : null}

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
