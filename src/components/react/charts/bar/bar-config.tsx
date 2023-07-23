import type { FC } from "react"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import {
  SliderExtended,
  SwitchExtended,
  SegmentedControlExtended,
} from "@/components/react"

export const BarConfig: FC<ChartConfigProps<"bar">> = ({
  config,
  setConfig,
}) => {
  return (
    <div className="space-y-2">
      <ConfigSection label="Chart Layout">
        <div className="flex flex-wrap">
          <SegmentedControlExtended<"grouped" | "stacked">
            label="Grouping Mode"
            description="How the data grouped"
            value={config.layout}
            defaultValue="stacked"
            data={["stacked", "grouped"]}
            onChange={(value) => setConfig({ groupMode: value })}
          />
          <SegmentedControlExtended<"vertical" | "horizontal">
            label="Orientation"
            description="Orientation of the charts"
            value={config.layout}
            defaultValue="vertical"
            data={["vertical", "horizontal"]}
            onChange={(value) => setConfig({ layout: value })}
          />
        </div>
        <SwitchExtended
          label="Reversed"
          description="Reverse bars, starts on top or right based on orientation."
          defaultChecked={false}
          checked={config.reverse}
          onChange={(value) => setConfig({ reverse: value })}
        />
      </ConfigSection>
      <ConfigSection label="Chart Padding">
        <div className="flex items-start space-x-2">
          <SliderExtended
            label="Padding"
            className="flex-1"
            description="Padding between each bar"
            min={0}
            max={1}
            step={0.1}
            defaultValue={0.2}
            value={config.padding}
            onChange={(val) => setConfig({ padding: val })}
          />
          <SliderExtended
            className="flex-1"
            label="Inner Padding"
            description="Padding between bars."
            min={0}
            max={100}
            step={1}
            defaultValue={0}
            value={config.innerPadding}
            onChange={(val) => setConfig({ innerPadding: val })}
          />
        </div>
      </ConfigSection>
      <ConfigSection label="Labels">
        <SwitchExtended
          label="Show Label"
          description="Enable/Disable label on chart"
          defaultChecked={true}
          checked={config.enableLabel}
          onChange={(value) => setConfig({ enableLabel: value })}
        />
      </ConfigSection>
      <ConfigSection label="Grid & Axes">
        <div className="flex space-x-2">
          <SwitchExtended
            label="X Grid"
            description="Enable/Disable X grid"
            defaultChecked={false}
            checked={config.enableGridX}
            onChange={(value) => setConfig({ enableGridX: value })}
          />
          <SwitchExtended
            label="Y Grid"
            description="Enable/Disable Y grid"
            defaultChecked={true}
            checked={config.enableGridY}
            onChange={(value) => setConfig({ enableGridY: value })}
          />
        </div>
      </ConfigSection>
    </div>
  )
}
