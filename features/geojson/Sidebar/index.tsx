import { Data } from '@geojson/Sidebar/Data';
import { Layers } from '@geojson/Sidebar/Layers';
import { AppsSettings } from '@geojson/Sidebar/Apps';
import { LegendOptions } from '@geojson/Sidebar/Legends';
import { createStyles, ScrollArea, Tabs } from '@mantine/core';
import { Adjustments, Map, Settings, Table } from 'tabler-icons-react';

const useStyles = createStyles((theme) => {
  return {
    tab_panel: {
      padding: theme.spacing.md,
      height: `calc(100vh - ${36 + 2 * theme.spacing.xs}px)`,
      display: 'flex',
      flexDirection: 'column'
    },
  };
});

const Sidebar = () => {
  const { classes } = useStyles();

  return (
    <Tabs defaultValue="data">
      <Tabs.List>
        <Tabs.Tab value="data" icon={<Table size={14} />}>
          Data
        </Tabs.Tab>
        <Tabs.Tab value="legends" icon={<Adjustments size={14} />}>
          Legends
        </Tabs.Tab>
        <Tabs.Tab value="layers" icon={<Map size={14} />}>
          Layers
        </Tabs.Tab>
        <Tabs.Tab value="apps" icon={<Settings size={14} />}>
          Apps
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="data" className={classes.tab_panel}>
        <Data />
      </Tabs.Panel>

      <Tabs.Panel value="legends" className={classes.tab_panel}>
        <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={100} scrollbarSize={5} offsetScrollbars >
          <LegendOptions />
        </ScrollArea>
      </Tabs.Panel>

      <Tabs.Panel value="layers" className={classes.tab_panel}>
        <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={100} scrollbarSize={5} offsetScrollbars >
          <Layers />
        </ScrollArea>
      </Tabs.Panel>

      <Tabs.Panel value="apps" className={classes.tab_panel}>
        <ScrollArea sx={{ flex: 1 }} type="scroll" scrollHideDelay={100} scrollbarSize={5} offsetScrollbars >
          <AppsSettings />
        </ScrollArea>
      </Tabs.Panel>
    </Tabs>
  )
}

export default Sidebar