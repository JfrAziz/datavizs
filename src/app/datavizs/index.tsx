import { Data } from "./data"
import type { FC } from "react"
import { Tabs, Button, Text } from "@mantine/core"
import { useDataStore } from "./store/data-store"
import { MantineProvider } from "@/components/react"
import { MantineDarkMode } from "./components/MantineDarkMode"
import { IconAppsFilled } from "@tabler/icons-react"

const Datavizs: FC = () => {
  return (
    <MantineProvider>
      <Tabs
        variant="pills"
        display="flex"
        defaultValue="data"
        classNames={{ root: "h-screen flex !flex-col p-1" }}
      >
        <Tabs.List className="flex items-center">
          <div className="flex-1 flex items-center">
            <Tabs.Tab value="data">Data</Tabs.Tab>
            <Tabs.Tab value="visualization">Visualization</Tabs.Tab>
          </div>
          <Button
            variant="outline"
            size="compact-sm"
            leftSection={<IconAppsFilled size={16} />}
            onClick={() => useDataStore.getState().createData()}
          >
            <Text size="sm">Import Data</Text>
          </Button>
          <MantineDarkMode />
        </Tabs.List>

        <Tabs.Panel
          value="visualization"
          classNames={{ panel: "flex !flex-1" }}
          className="flex overflow-hidden pt-2 border-t border-neutral-border mt-2"
        >
          <div>Visualization</div>
        </Tabs.Panel>

        <Tabs.Panel
          value="data"
          classNames={{ panel: "flex !flex-1 flex-row" }}
          className="flex overflow-hidden border-t border-neutral-border mt-2"
        >
          <Data />
        </Tabs.Panel>
      </Tabs>
    </MantineProvider>
  )
}

export default Datavizs
