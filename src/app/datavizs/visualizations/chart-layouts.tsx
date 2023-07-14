import type { FC } from "react"
import { ScrollArea } from "@mantine/core"
import { charts } from "@/components/react/charts"
import { useVizsStore } from "@/app/datavizs/store/visz-store"

export const ChartLayouts: FC = () => {
  const viszs = useVizsStore((state) => state.visz)

  return (
    <div className="flex-1 flex overflow-hidden">
      <ScrollArea className="flex w-full">
        <div className="my-4">
          <div className="flex flex-col justify-center items-center">
            {Object.keys(viszs).map((item) => {
              const Chart = charts[viszs[item].type]

              return (
                <div
                  key={item}
                  className="bg-neutral-hover border-x first:border-t last:border-b border-neutral-border shadow-lg rounded-sm"
                >
                  <Chart.Component {...(viszs[item].config as any)} />
                </div>
              )
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
