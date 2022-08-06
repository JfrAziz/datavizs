import { useStyles } from './styles';
import React, { PropsWithChildren } from 'react';
import { Group, GroupProps, Text } from '@mantine/core';


/**
 * Wrapper Component for any options
 * 
 * @param props
 * @returns 
 */
export const OptionWrapper = ({ children, ...others }: PropsWithChildren & GroupProps) => {
  const { classes } = useStyles();
  return (
    <Group position="apart" className={classes.options} noWrap spacing="xl" {...others}>
      {children}
    </Group>
  );
}


interface OptionsProps extends React.PropsWithChildren {
  title: string;
  description?: string;
}

/**
 * Options with title and description and another child component, like
 * Button, Input, or anythings.
 * 
 * @param props 
 * @returns 
 */
export const Options = ({ title, description, children }: OptionsProps) => (
  <OptionWrapper>
    <div>
      <Text>{title}</Text>
      {description && <Text size="xs" color="dimmed">{description}</Text>}
    </div>
    {children}
  </OptionWrapper>
)