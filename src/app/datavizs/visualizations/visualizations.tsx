import type { FC } from "react"
import { ScrollArea } from "@mantine/core"
import { charts } from "@/app/datavizs/components/charts"
import { useVizsStore } from "@/app/datavizs/store/visz-store"

export const Visualization: FC = () => {
  const viszs = useVizsStore((state) => state.visz)

  const firstVisz = Object.keys(viszs)[0]

  const chart = useVizsStore((state) => state.visz[firstVisz])

  const Chart = charts[chart["type"]]

  return (
    <div className="flex-1 flex flex-row">
      <div className="flex-1 border-r border-r-neutral-border p-4">
        <Chart.Config
          config={chart.config as any}
          setConfig={(config) =>
            useVizsStore.setState((state) => {
              state.visz[firstVisz].config = config
            })
          }
        />
      </div>
      <div className="flex-[2] flex overflow-hidden">
        <ScrollArea className="flex w-full">
          <ChartLayout />
        </ScrollArea>
      </div>
    </div>
  )
}

export const ChartLayout: FC = () => {
  const viszs = useVizsStore((state) => state.visz)

  return (
    <div className="my-4">
      <div className="flex flex-col justify-center items-center">
        {Object.keys(viszs).map((item) => {
          const Chart = charts[viszs[item].type]

          return (
            <div
              key={item}
              className="bg-neutral-hover border-x first:border-t last:border-b border-neutral-border shadow-lg"
            >
              <Chart.Component {...(viszs[item].config as any)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
