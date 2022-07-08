import { createStyles } from '@mantine/core';
// eslint-disable-next-line import/no-cycle
// import { NAVBAR_BREAKPOINT } from '../Navbar/Navbar.styles';

export const HEADER_HEIGHT = 60;
export const HEADER_BREAKPOINT = 860;

export default createStyles((theme) => ({
  header: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
  },

  links: {
    flex: 1,
    marginLeft: theme.spacing.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing.md,
  },

  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'all',
  },

  mainSection: {
    display: 'flex',
    alignItems: 'center',
  },
}));