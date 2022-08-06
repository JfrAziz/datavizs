import { useStyles } from './styles';
import { Divider as MantineDivider, DividerProps } from '@mantine/core';

export function Divider(props: DividerProps) {
  const { classes } = useStyles()
  return <MantineDivider mt="xl" mb="sm" labelPosition="center" className={classes.divider} classNames={{ label: classes.dividerLabel }} {...props} />
}