import { Data } from '@components/Sidebar/Data';
import { Options } from '@components/Sidebar/Options';
import { createStyles, ScrollArea, Tabs } from '@mantine/core';
import { Settings as SettingsPage } from '@components/Sidebar/Settings';
import { Adjustments, Camera, Settings, Table } from 'tabler-icons-react';

const useStyles = createStyles((theme) => {
  return {
    tab_body: {
      padding: theme.spacing.md,
      height: `calc(100vh - ${40 + 2 * theme.spacing.xs}px)`,
      display: 'flex',
      flexDirection: 'column'
    },
    scroll_viewport: {
      '> div': {
        display: 'block !important'
      }
    }
  };
});

export const Sidebar = () => {
  const { classes } = useStyles();

  return (
    <Tabs classNames={{ body: classes.tab_body }}>
      <Tabs.Tab label="Data" icon={<Table size={14} />}>
        <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={200} classNames={{ viewport: classes.scroll_viewport }} scrollbarSize={5} >
          <Data />
        </ScrollArea>
      </Tabs.Tab>
      <Tabs.Tab label="Options" icon={<Adjustments size={14} />}>
        <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={200} scrollbarSize={5} >
          <Options />
        </ScrollArea>
      </Tabs.Tab>
      <Tabs.Tab label="Screenshoot" icon={<Camera size={14} />}>
        <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={200} scrollbarSize={5} >
          Screenshoot
        </ScrollArea>
      </Tabs.Tab>
      <Tabs.Tab label="Settings" icon={<Settings size={14} />}>
        <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={200} scrollbarSize={5} >
          <SettingsPage />
        </ScrollArea>
      </Tabs.Tab>
    </Tabs>
  )
}