import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import useStyles from './HeaderControl.styles';
import { UnstyledButton, Tooltip } from '@mantine/core';

interface HeaderControlProps extends React.ComponentPropsWithoutRef<'button'> {
  tooltip: string;
  link?: string;
}

export function HeaderControl({ className, tooltip, link, ...others }: HeaderControlProps) {
  const { classes, cx, theme } = useStyles();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  if (link) {
    return (
      <Tooltip
        label={tooltip}
        disabled={isMobile}
        className={cx(classes.container, className)}
        transitionDuration={0}
        openDelay={500}
      >
        <a className={cx(classes.control)} href={link} {...(others as any)}>
          {others.children}
        </a>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      label={tooltip}
      disabled={isMobile}
      className={cx(classes.container, className)}
      transitionDuration={0}
      openDelay={500}
    >
      <UnstyledButton className={cx(classes.control)} {...others} />
    </Tooltip>
  );
}