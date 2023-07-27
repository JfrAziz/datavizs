import type { FC } from "react"
import { ChartConfig } from "./chart"
import { Tabs, Text, Button } from "@mantine/core"
import { IconChartDonutFilled } from "@tabler/icons-react"

export const Config: FC = () => {
  return (
    <Tabs
      defaultValue="chart"
      className="border-r border-r-neutral-border pt-2 !flex !flex-col w-full max-w-md"
    >
      <Tabs.List className="flex items-center">
        <div className="flex flex-1">
          <Tabs.Tab value="chart">Chart</Tabs.Tab>
          <Tabs.Tab value="layout">Layout</Tabs.Tab>
        </div>
        <div className="pr-2">
          <Button
            size="compact-sm"
            variant="filled"
            leftSection={<IconChartDonutFilled size={16} />}
          >
            <Text size="sm">New Chart</Text>
          </Button>
        </div>
      </Tabs.List>

      <Tabs.Panel value="chart" className="relative flex overflow-hidden py-2">
        <ChartConfig />
      </Tabs.Panel>

      <Tabs.Panel value="layout" className="relative flex overflow-hidden">
        Layouts
      </Tabs.Panel>
    </Tabs>
  )
}
