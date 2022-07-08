import { Box, Group, useMantineColorScheme } from '@mantine/core';
import { BrandGithub, Sun, Moon, Plus } from 'tabler-icons-react';
import { HeaderControl } from './HeaderControl';

export function HeaderControls() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box>
      <Group pr="md" spacing="xs">
        <HeaderControl tooltip="Create a Map">
          <Plus size={22} />
        </HeaderControl>

        <HeaderControl
          onClick={() => toggleColorScheme()}
          tooltip={`${colorScheme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {colorScheme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </HeaderControl>

        <HeaderControl
          link="https://github.com/mantinedev/mantine/"
          tooltip="Source code"
        >
          <BrandGithub size={20} />
        </HeaderControl>
      </Group>
    </Box>
  );
}