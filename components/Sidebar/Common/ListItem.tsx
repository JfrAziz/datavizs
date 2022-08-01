import useStyles from './Sidebar.styles';
import { Group, GroupProps, Text } from '@mantine/core';
import React, { PropsWithChildren } from 'react';


/**
 * BaseList Component for any options
 * 
 * @param props
 * @returns 
 */
export const BaseList = ({ children, ...others }: PropsWithChildren & GroupProps) => {
  const { classes } = useStyles();
  return (
    <Group position="apart" className={classes.item} noWrap spacing="xl" {...others}>
      {children}
    </Group>
  );
}


interface ListItemProps extends React.PropsWithChildren {
  title: string;
  description?: string;
}

/**
 * List item with title and description and another child component, like
 * Button, Input, or anythings.
 * 
 * @param props 
 * @returns 
 */
export const ListItem = ({ title, description, children }: ListItemProps) => (
  <BaseList>
    <div>
      <Text>{title}</Text>
      {description && <Text size="xs" color="dimmed">{description}</Text>}
    </div>
    {children}
  </BaseList>
)