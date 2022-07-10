import { Switch, useMantineColorScheme } from "@mantine/core";
import useStyles from "../Sidebar/Sidebar.styles";
import { ListItem } from "../Sidebar/ListItem";

export function DarkMode() {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ListItem title="Dark Mode" description="Activate dark mode features" >
      <Switch className={classes.switch} size="sm" checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} />
    </ListItem>
  );
}