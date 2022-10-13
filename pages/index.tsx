import Head from 'next/head';
import type { NextPage } from 'next'
import { createStyles } from '@mantine/core';
import Maps from 'features/maps/components/Maps';
import Sidebar from 'features/maps/components/Sidebar';
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
        <title>Maps Editor | Datavizs</title>
        <meta name="description" content="Open source tools to create data visualizations with simple UI, and let you create beautiful choropleth maps with your own data" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Datavizs" />
        <meta property="og:title" content="Maps Editor | Datavizs" />
        <meta property="og:url" content="https://datavizs.vercel.app" />
        <meta property="og:image" content="https://datavizs.vercel.app/og-image.png" />
        <meta property="og:description" content="Open source tools to create data visualizations with simple UI, and let you create beautiful choropleth maps with your own data" />

        <meta name="twitter:site" content="@jfrAziz" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Maps Editor | Datavizs" />
        <meta name="twitter:image" content="https://datavizs.vercel.app/og-image.png" />
        <meta name="twitter:description" content="Open source tools to create data visualizations with simple UI, and let you create beautiful choropleth maps with your own data" />

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
