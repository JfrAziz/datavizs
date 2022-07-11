import { useMantineColorScheme } from "@mantine/core";
import { ListItem } from "../Sidebar/ListItem";
import { Switcher } from "../Sidebar/Switcher";

export function DarkMode() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ListItem title="Dark Mode" description="Activate dark mode features" >
      <Switcher checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} />
    </ListItem>
  );
}