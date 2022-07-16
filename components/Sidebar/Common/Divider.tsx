import { Divider as MantineDivider, DividerProps } from '@mantine/core';

export function Divider(props: DividerProps) {
  return <MantineDivider mt="xl" mb="sm" labelPosition="center" sx={(theme) => ({
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
  })} styles={(theme => ({
    label: {
      '&::after, &::before': {
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
          }`,
      },
    }
  }))} {...props} />
}