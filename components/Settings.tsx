import { createStyles } from "@mantine/core";
import React, { PropsWithChildren } from 'react';
import { Group, GroupProps, Text } from '@mantine/core';


const useStyles = createStyles((theme) => ({
  settings: {
    '& + &': {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },
  },
}))

/**
 * Wrapper Component for any settings
 * 
 * @param props
 * @returns 
 */
export const SettingsWrapper = ({ children, ...others }: PropsWithChildren & GroupProps) => {
  const { classes } = useStyles();
  return (
    <Group position="apart" className={classes.settings} noWrap spacing="xl" {...others}>
      {children}
    </Group>
  );
}


interface SettingsProps extends React.PropsWithChildren {
  title: string;
  description?: string;
}

/**
 * Settings with title and description and another child component, like
 * Button, Input, or anythings.
 * 
 * @param props 
 * @returns 
 */
export const Settings = ({ title, description, children }: SettingsProps) => (
  <SettingsWrapper>
    <div>
      <Text>{title}</Text>
      {description && <Text size="xs" color="dimmed">{description}</Text>}
    </div>
    {children}
  </SettingsWrapper>
)