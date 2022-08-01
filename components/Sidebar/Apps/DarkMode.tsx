import { Switch, useMantineColorScheme } from "@mantine/core";
import { ListItem } from "../Common/ListItem";

export function DarkMode() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ListItem title="Dark Mode" description="Activate dark mode features" >
      <Switch checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} />
    </ListItem>
  );
}