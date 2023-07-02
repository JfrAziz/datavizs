import { Data } from "./data"
import type { FC } from "react"
import { Tabs } from "@mantine/core"
import { DataImportModalButton } from "./data/data-import"
import { MantineProvider, ToggleDarkModeButton } from "@/components/react"

const Datavizs: FC = () => {
  return (
    <MantineProvider>
      <Tabs
        display="flex"
        variant="pills"
        defaultValue="data"
        classNames={{ root: "h-screen flex !flex-col p-1" }}
      >
        <Tabs.List className="flex items-center">
          <div className="flex-1 flex items-center">
            <Tabs.Tab value="data">Data</Tabs.Tab>
            <Tabs.Tab value="visualization">Visualization</Tabs.Tab>
          </div>
          <DataImportModalButton size="compact-sm" variant="filled" />
          <ToggleDarkModeButton />
        </Tabs.List>

        <Tabs.Panel
          value="visualization"
          classNames={{ panel: "flex !flex-1" }}
          className="flex overflow-hidden pt-2 border-t border-neutral-border mt-2"
        >
          <div>Visualization Tab</div>
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
