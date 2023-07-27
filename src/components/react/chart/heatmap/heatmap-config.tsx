import type { FC } from "react"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import { SliderExtended, SwitchExtended } from "@/components/react"

export const HeatMapConfig: FC<ChartConfigProps<"heatmap">> = ({
  config,
  setConfig,
}) => (
  <div>
    <ConfigSection label="Bar Design">
      <div className="flex items-start space-x-2">
        <SliderExtended
          className="flex-1"
          label="X Inner Padding"
          description="Horizontal padding between box"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0}
          value={config.xInnerPadding}
          onChange={(val) => setConfig({ xInnerPadding: val })}
        />
        <SliderExtended
          className="flex-1"
          label="Y Inner Padding"
          description="Vertical padding between box"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0}
          value={config.yInnerPadding}
          onChange={(val) => setConfig({ yInnerPadding: val })}
        />
      </div>
      <div className="flex items-start space-x-2">
        <SliderExtended
          className="flex-1"
          label="X Outer Padding"
          description="Horizontal padding on the outside"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0}
          value={config.xOuterPadding}
          onChange={(val) => setConfig({ xOuterPadding: val })}
        />
        <SliderExtended
          className="flex-1"
          label="Y Outer Padding"
          description="Vertical padding padding on the outside"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0}
          value={config.yOuterPadding}
          onChange={(val) => setConfig({ yOuterPadding: val })}
        />
      </div>
      <div className="flex items-start space-x-2">
        <SliderExtended
          className="flex-1"
          label="Border Radius"
          description="Cell border radius"
          min={0}
          max={16}
          step={0.1}
          defaultValue={0}
          value={config.borderRadius}
          onChange={(val) => setConfig({ borderRadius: val })}
        />
        <SliderExtended
          className="flex-1"
          label="Border Width"
          description="Cell border width"
          min={0}
          max={16}
          step={0.1}
          defaultValue={0}
          value={config.borderWidth}
          onChange={(val) => setConfig({ borderWidth: val })}
        />
      </div>
    </ConfigSection>
    <ConfigSection label="Labels">
      <SwitchExtended
        label="Show Labels"
        description="Enable/Disable labels"
        defaultChecked={true}
        checked={config.enableLabels}
        onChange={(value) => setConfig({ enableLabels: value })}
      />
    </ConfigSection>
  </div>
)
