import type { FC } from "react"
import { ConfigSection } from "../layouts"
import { Transition } from "@mantine/core"
import type { ChartConfigProps } from "../types"
import { SliderExtended, SwitchExtended } from "@/components/react"

export const RadialBarConfig: FC<ChartConfigProps<"radialbar">> = ({
  config,
  setConfig,
}) => {
  return (
    <div>
      <ConfigSection label="Bar Design">
        <div className="flex items-start space-x-2">
          <SliderExtended
            className="flex-1"
            label="Start Angle"
            description="To make it gauges"
            max={360}
            min={-360}
            step={0.1}
            defaultValue={0}
            value={config.startAngle}
            onChange={(val) => setConfig({ startAngle: val })}
          />
          <SliderExtended
            className="flex-1"
            label="End Angle"
            description="To make it gauges"
            max={360}
            min={-360}
            step={0.1}
            defaultValue={270}
            value={config.endAngle}
            onChange={(val) => setConfig({ endAngle: val })}
          />
        </div>
        <div className="flex items-start space-x-2">
          <SliderExtended
            className="flex-1"
            label="Padding Angle"
            description="Padding between each bar."
            min={0}
            max={180}
            step={0.1}
            defaultValue={0}
            value={config.padAngle}
            onChange={(val) => setConfig({ padAngle: val })}
          />
          <SliderExtended
            className="flex-1"
            label="Padding"
            description="Padding between each bar."
            min={0}
            max={0.9}
            step={0.01}
            defaultValue={0.2}
            value={config.padding}
            onChange={(val) => setConfig({ padding: val })}
          />
        </div>
        <div className="flex items-start space-x-2">
          <SliderExtended
            className="flex-1"
            label="Inner Radius"
            description="Radius from the center"
            min={0}
            max={0.95}
            step={0.01}
            defaultValue={0.3}
            value={config.innerRadius}
            onChange={(val) => setConfig({ innerRadius: val })}
          />
          <SliderExtended
            className="flex-1"
            label="Corner Radius"
            description="Corner radius each pie slice"
            min={0}
            max={100}
            step={0.01}
            defaultValue={0}
            value={config.cornerRadius}
            onChange={(val) => setConfig({ cornerRadius: val })}
          />
        </div>
        <SliderExtended
          label="Border"
          description="Border with for each pie slice"
          min={0}
          max={16}
          step={0.01}
          defaultValue={0}
          value={config.borderWidth}
          onChange={(val) => setConfig({ borderWidth: val })}
        />
      </ConfigSection>
      <ConfigSection label="Grid">
        <SwitchExtended
          label="Tracks"
          description="Enable/Disable tracks"
          defaultChecked={true}
          checked={config.enableTracks}
          onChange={(value) => setConfig({ enableTracks: value })}
        />
        <div className="flex space-x-2">
          <SwitchExtended
            label="Radial Grid"
            description="Enable/Disable radial grid"
            defaultChecked={true}
            checked={config.enableRadialGrid}
            onChange={(value) => setConfig({ enableRadialGrid: value })}
          />
          <SwitchExtended
            label="Circular Grid"
            description="Enable/Disable cicular grid"
            defaultChecked={true}
            checked={config.enableCircularGrid}
            onChange={(value) => setConfig({ enableCircularGrid: value })}
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
        <Transition transition="fade" mounted={config.enableLabels ?? true}>
          {(styles) => (
            <div style={styles} className="flex items-start space-x-2">
              <SliderExtended
                className="flex-1"
                label="Label offset"
                description="Offset from center"
                min={0}
                max={1.2}
                step={0.01}
                defaultValue={0.5}
                value={config.labelsRadiusOffset}
                onChange={(val) => setConfig({ labelsRadiusOffset: val })}
              />
              <SliderExtended
                className="flex-1"
                label="Skip Labels"
                description="Hide lable if angle degree is lower"
                min={0}
                max={90}
                step={0.01}
                defaultValue={0}
                value={config.labelsSkipAngle}
                onChange={(val) => setConfig({ labelsSkipAngle: val })}
              />
            </div>
          )}
        </Transition>
      </ConfigSection>
    </div>
  )
}
