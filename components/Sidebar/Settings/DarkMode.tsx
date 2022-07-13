import { useMantineColorScheme } from "@mantine/core";
import { ListItem } from "../Items/ListItem";
import { Switcher } from "../Items/Switcher";

export function DarkMode() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ListItem title="Dark Mode" description="Activate dark mode features" >
      <Switcher checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} />
    </ListItem>
  );
}