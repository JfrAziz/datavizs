import type { NextPage } from 'next'
import { createStyles } from '@mantine/core';
import Maps from 'features/maps/components/Maps';
import Sidebar from 'features/maps/components/Sidebar';
import { DatavizsHead } from '@components/DatavizsHead';
import { MantineProvider } from '@components/MantineProvider';


const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.breakpoints.lg
  return {
    container: {
      [theme.fn.largerThan(BREAKPOINT)]: {
        display: 'flex',
        height: '100vh',
      },
    },
    map_container: {
      flex: 1,
      backgroundColor: '#eee',

      [theme.fn.smallerThan(BREAKPOINT)]: {
        display: 'flex',
        height: '75vh',
      },
    },
    sidebar_container: {
      width: '100%',
      padding: theme.spacing.xs,
      maxWidth: theme.breakpoints.sm,
      margin: "auto",

      [theme.fn.largerThan(BREAKPOINT)]: {
        maxWidth: theme.breakpoints.xs,
      },
    },
  };
});

const Home: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <DatavizsHead
        pageTitle="Maps Visz"
        ogImage="https://datavizs.vercel.app/og-image.png"
        description="Open source tools to create beautiful data visualizations with simple UI"
      />
      <MantineProvider>
        <div className={classes.container}>
          <div className={classes.map_container}>
            <Maps />
          </div>
          <div className={classes.sidebar_container}>
            <Sidebar />
          </div>
        </div>
      </MantineProvider>
    </>
  )
}

export default Home
