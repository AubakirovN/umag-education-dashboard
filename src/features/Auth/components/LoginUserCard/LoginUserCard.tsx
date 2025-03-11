import { getUserInfo } from "@/core/api";
import { setUser } from "@/slice/userSlice";
import { Avatar, Text, Paper, Grid } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

interface LoginUserCardProps {
  avatar: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  close: () => void;
}

export function LoginUserCard({
  avatar,
  setIsLoading,
  close,
}: LoginUserCardProps) {
  const { t } = useTranslation(["translation", "auth"]);
  const dispatch = useDispatch();
  const loginAs = async () => {
    try {
      setIsLoading(true);
      await getUserInfo().then((resp) => {
        close();
        dispatch(setUser(resp));
        setIsLoading(false);
      });
    } catch (e) {
      setIsLoading(false);
    }
  };
  return (
    <Paper
      radius="md"
      p="lg"
      onClick={loginAs}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Grid align="center">
        <Grid.Col span={5}>
          <Avatar src={avatar} size={120} radius={120} mx="auto" />
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
