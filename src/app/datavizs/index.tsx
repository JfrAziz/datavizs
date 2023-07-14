import type { FC } from "react"
import { Tabs } from "@mantine/core"
import { Visualization } from "./visualizations"
import { Data, DataImportModalButton } from "./data"
import { MantineProvider, ToggleDarkModeButton } from "@/components/react"

const Datavizs: FC = () => {
  return (
    <MantineProvider>
      <Tabs
        display="flex"
        variant="pills"
        defaultValue="visualization"
        classNames={{ root: "absolute h-full w-full flex !flex-col p-1" }}
      >
        <Tabs.List className="flex items-center">
          <div className="flex-1 flex items-center">
            <Tabs.Tab value="data">Data</Tabs.Tab>
            <Tabs.Tab value="visualization">Visualization</Tabs.Tab>
          </div>
          <ToggleDarkModeButton />
          <DataImportModalButton size="compact-sm" variant="filled" />
        </Tabs.List>

        <Tabs.Panel
          value="visualization"
          classNames={{ panel: "flex !flex-1" }}
          className="flex overflow-hidden border-t border-neutral-border mt-2"
        >
          <Visualization />
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
