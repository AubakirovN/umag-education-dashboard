import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
  button: {
    fontSize: rem(18),
    padding: rem(5),
  },
  center: {
    textAlign: "center",
  },
}));

export function ErrorPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { status } = useParams();
  const [title, setTitle] = useState<string | null>();
  const [text, setText] = useState<string | null>();

  const checkStatus = (error: string | undefined) => {
    switch (error) {
      case "404":
        setTitle(t("errors.code404"));
        setText(t("errors.text404"));
        return;
      case "400":
        setTitle(t("errors.code400"));
        setText(t("errors.text400"));
        return;
      case "403":
        setTitle(t("errors.code403"));
        setText(t("errors.text403"));
        return;
    }
  };
  useEffect(() => {
    return checkStatus(status);
  }, [status]);

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{status}</div>
      <Title className={classes.title}>{title}</Title>
      <div className={classes.center}>
        <Text
          component="span"
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          {text}
        </Text>
        <Button
          variant="subtle"
          className={classes.button}
          onClick={() => navigate("/")}
        >
          на главную
        </Button>
      </div>
    </Container>
  );
}
