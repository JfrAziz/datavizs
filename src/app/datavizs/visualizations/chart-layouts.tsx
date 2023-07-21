import { useMemo, type FC } from "react"
import { ScrollArea } from "@mantine/core"
import { charts } from "@/components/react/charts"
import { useVizsStore } from "@/app/datavizs/store/visz-store"

const ChartComponent: FC<{ chartId: string }> = ({ chartId }) => {
  const chart = useVizsStore((state) => state.visz[chartId])
  const Chart = charts[chart.type]

  const Component = useMemo(
    () => <Chart.Component {...(chart.config as any)} />,
    [chart.config]
  )

  return <div className="min-w-[640px] w-[640px] h-[640px]">{Component}</div>
}

export const ChartLayouts: FC = () => {
  const viszs = useVizsStore((state) => state.visz)

  return (
    <div className="flex-1 flex overflow-hidden">
      <ScrollArea className="flex w-full">
        <div className="flex justify-center items-center ">
          <div className="border border-neutral-border bg-neutral-hover shadow-lg rounded-sm m-10">
            <div className="grid grid-cols-2 gap-5 auto-cols-max auto-rows-max">
              {Object.keys(viszs).map((item) => (
                <ChartComponent key={item} chartId={item} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
