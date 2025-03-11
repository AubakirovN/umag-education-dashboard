import {
  Image,
  Container,
  Title,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import character from "/src/img/character.png";
import { useStyles } from "./styles.ts";

export function HeroHeader() {
  const { classes } = useStyles();
  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Система</span> для администрирования портала по курсам
          </Title>
          <Text color="dimmed" mt="md">
            Получите доступ к управлению контентом курсов Umag,
            которое поможет вам загружать уроки и контролировать прохождение курсов
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={rem(12)} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Создание курсов</b> – включает в себя добавление лекции, видео и иногда тестовых заданий
            </List.Item>
            <List.Item>
              <b>Ролевое управление доступами</b> – можно назначать курсы на отдельные роли, если нужно ограничить к ним доступ.
              мероприятия
            </List.Item>
            <List.Item>
              <b>Отчеты и аналитика</b> – отчеты по просмотрам, прохождению курсов.
            </List.Item>
          </List>

        </div>
        <Image src={character} className={classes.image} />
      </div>
    </Container>
  );
}
