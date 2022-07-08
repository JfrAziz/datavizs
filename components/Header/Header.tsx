import React from 'react';
import { HeaderControls } from './HeaderControls';
import useStyles from './Header.styles';
import { Header as HeaderMantine } from "@mantine/core"

export default function Header() {
  const { classes } = useStyles();
  return (
    <HeaderMantine height={70} p="md">
      <div className={classes.header}>
        <div className={classes.mainSection}>
          <div className={classes.logoWrapper}>
            <div className={classes.logo}>
              Logo
            </div>
          </div>
        </div>
        <HeaderControls />
      </div>
    </HeaderMantine>
  );
}