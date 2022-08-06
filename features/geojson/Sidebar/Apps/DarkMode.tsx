import { Options } from "@components/Options";
import { Switch, useMantineColorScheme } from "@mantine/core";

export function DarkMode() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Options title="Dark Mode" description="Activate dark mode features" >
      <Switch checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} />
    </Options>
  );
}