import { Data } from '@components/Sidebar/Data';
import { Maps } from '@components/Sidebar/Maps';
import { createStyles, ScrollArea, Tabs } from '@mantine/core';
import { LegendOptions } from '@components/Sidebar/Legend';
import { Settings as SettingsPage } from '@components/Sidebar/Settings';
import { Adjustments, Map, Settings, Table } from 'tabler-icons-react';

const useStyles = createStyles((theme) => {
  return {
    tab_body: {
      padding: theme.spacing.md,
      height: `calc(100vh - ${40 + 2 * theme.spacing.xs}px)`,
      display: 'flex',
      flexDirection: 'column'
    },
  };
});

export const Sidebar = () => {
  const { classes } = useStyles();

  return (
    <Tabs classNames={{ body: classes.tab_body }}>
      <Tabs.Tab label="Data" icon={<Table size={14} />}>
        <Data />
      </Tabs.Tab>
      <Tabs.Tab label="Legends" icon={<Adjustments size={14} />}>
        <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={200} scrollbarSize={5} >
          <LegendOptions />
        </ScrollArea>
      </Tabs.Tab>
      <Tabs.Tab label="Maps" icon={<Map size={14} />}>
        <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={200} scrollbarSize={5} >
          <Maps/>
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