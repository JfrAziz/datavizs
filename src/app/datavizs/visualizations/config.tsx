import type { FC } from "react"
import { charts } from "@/components/react/charts"
import { IconChartDonutFilled } from "@tabler/icons-react"
import { useVizsStore } from "@/app/datavizs/store/visz-store"
import { Tabs, Button, ScrollArea, Accordion, Text } from "@mantine/core"

export const Config: FC = () => {
  const viszs = useVizsStore((state) => state.visz)

  const firstVisz = Object.keys(viszs)[0]

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
        <ScrollArea className="!flex-1">
          <Accordion defaultValue={firstVisz} variant="contained">
            {Object.keys(viszs).map((chartId) => {
              const viszs = useVizsStore((state) => state.visz[chartId])

              const Config = charts[viszs.type].Config

              return (
                <Accordion.Item key={chartId} value={chartId}>
                  <Accordion.Control>{viszs.name}</Accordion.Control>
                  <Accordion.Panel>
                    <Config
                      config={viszs.config as any}
                      setConfig={(config: any) =>
                        useVizsStore.getState().updateConfig(chartId, config)
                      }
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              )
            })}
          </Accordion>
        </ScrollArea>
      </Tabs.Panel>

      <Tabs.Panel value="layout" className="relative flex overflow-hidden">
        Layouts
      </Tabs.Panel>
    </Tabs>
  )
}
