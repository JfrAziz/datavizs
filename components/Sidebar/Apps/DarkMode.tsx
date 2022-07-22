import { useMantineColorScheme } from "@mantine/core";
import { ListItem } from "../Common/ListItem";
import { Switcher } from "../Common/Switcher";

export function DarkMode() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ListItem title="Dark Mode" description="Activate dark mode features" >
      <Switcher checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} />
    </ListItem>
  );
}