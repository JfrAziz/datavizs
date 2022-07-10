import React from 'react';
import { Group, Text } from '@mantine/core';
import useStyles from './OptionsItem.styles';

interface OptionsItemProps extends React.PropsWithChildren {
  title: string;
  description?: string;
}

export function OptionsItem({ title, description, children }: OptionsItemProps) {
  const { classes } = useStyles();

  return (
    <Group position="apart" className={classes.item} noWrap spacing="xl">
      <div>
        <Text>{title}</Text>
        {
          description && (
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          )
        }
      </div>
      {children}
    </Group>
  );
}