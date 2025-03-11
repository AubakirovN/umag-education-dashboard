import { Menu, createStyles, getStylesRef } from "@mantine/core";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "ru",
    name: "Русский",
    flag: "🇷🇺",
  },
  {
    code: "kk",
    name: "Қазақша",
    flag: "🇰🇿",
  },
];

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
    fontSize: 18,
  },
}));

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { classes } = useStyles();

  const currentLanguage = useMemo(
    () => languages.find((lang) => lang.code === i18n.language),
    [i18n.language]
  );

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <a className={classes.link}>
          <span className={classes.linkIcon}>{currentLanguage?.flag}</span>{" "}
          <span>{currentLanguage?.name}</span>
        </a>
      </Menu.Target>

      <Menu.Dropdown>
        {languages.map((lang) => (
          <Menu.Item
            key={lang.code}
            icon={lang.flag}
            onClick={() => handleLanguageChange(lang.code)}
          >
            {lang.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
