import { Settings } from "@components/Settings";
import { Switch, useMantineColorScheme } from "@mantine/core";

export function DarkMode() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Settings title="Dark Mode" description="Activate dark mode features" >
      <Switch checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} />
    </Settings>
  );
}