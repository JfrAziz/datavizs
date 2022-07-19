import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next'
import { createStyles } from '@mantine/core';
import { Sidebar } from '@components/Sidebar';
import { MantineProvider } from '@components/Provider/MantineProvider';

const MapWithNoSSR = dynamic(() => import("@components/Maps"), { ssr: false });

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
      backgroundColor: 'white',

      [theme.fn.smallerThan(BREAKPOINT)]: {
        display: 'flex',
        height: '75vh',
      },
    },
    sidebar_container: {
      width: '100%',
      padding: theme.spacing.xs,

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
      <Head>
        <title>App Title</title>
        <meta name="description" content="Maps Apps" />
      </Head>
      <MantineProvider>
        <div className={classes.container}>
          <div className={classes.map_container}>
            <MapWithNoSSR />
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
