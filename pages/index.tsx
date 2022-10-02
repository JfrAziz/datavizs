import Head from 'next/head';
import Maps from '@geojson/Maps';
import type { NextPage } from 'next'
import Sidebar from '@geojson/Sidebar';
import { createStyles } from '@mantine/core';
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
      <Head>
        <title>Maps (GeoJSON) Editor | Datavizs</title>
        <meta name="description" content="Datavizs is open source tools to create data visualizations with simple UI, and let you create beautiful choropleth maps with your own data" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
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
