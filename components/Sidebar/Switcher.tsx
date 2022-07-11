import { Switch, SwitchProps } from "@mantine/core";
import useStyles from "../Sidebar/Sidebar.styles";

interface SwitcherProps extends SwitchProps { }

export function Switcher(props: SwitcherProps) {
  const { classes } = useStyles();
  return <Switch className={classes.switch} size="sm" {...props} />
}