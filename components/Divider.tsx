import { createStyles } from "@mantine/core";
import { Divider as MantineDivider, DividerProps } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  divider: {
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },
  dividerLabel: {
    '&::after, &::before': {
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    }
  }
}));


export function Divider(props: DividerProps) {
  const { classes } = useStyles()
  return <MantineDivider
    mt="xl"
    mb="sm"
    labelPosition="center"
    className={classes.divider}
    classNames={{ label: classes.dividerLabel }} {...props} />
}