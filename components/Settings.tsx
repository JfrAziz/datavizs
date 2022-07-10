import { Button, Switch, useMantineColorScheme } from "@mantine/core";
import useStyles from "./Options/OptionsItem.styles";
import { OptionsItem } from "./Options/OptionsItem";
import { BrandGithub } from "tabler-icons-react";

export function Settings() {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  
  return (
    <div>
      <OptionsItem title="Dark Mode" description="Activate dark mode features" >
        <Switch className={classes.switch} size="sm" checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} />
      </OptionsItem>
      <OptionsItem title="App Name" description="v.0.1" >
        <Button component="a" target="_blank" href="https://github.com" variant="outline" leftIcon={<BrandGithub size={14} />}>
          Github
        </Button>
      </OptionsItem>
    </div>
  );
}