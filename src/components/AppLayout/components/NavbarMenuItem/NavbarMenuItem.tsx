import { Group, Box, ThemeIcon, createStyles } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  TablerIconsProps,
} from "@tabler/icons-react";

interface NavbarMenuItemProps {
  label: string;
  icon: React.FC<TablerIconsProps>;
  opened?: boolean;
  hasLinks?: boolean;
}

const useStyles = createStyles(() => ({
  chevron: {
    transition: "transform 200ms ease",
  },
}));

export function NavbarMenuItem({
  icon: Icon,
  label,
  opened,
  hasLinks,
}: NavbarMenuItemProps) {
  const { classes, theme } = useStyles();

  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  return (
    <Group position="apart" spacing={0}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ThemeIcon variant="light" size={30}>
          <Icon size="1.1rem" />
        </ThemeIcon>
        <Box ml="md">{label}</Box>
      </Box>
      {hasLinks && (
        <ChevronIcon
          className={classes.chevron}
          size="1rem"
          stroke={1.5}
          style={{
            transform: opened
              ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
              : "none",
          }}
        />
      )}
    </Group>
  );
}
