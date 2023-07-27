import type { FC } from "react"
import { ConfigSection } from "../layouts"
import { Transition } from "@mantine/core"
import type { ChartConfigProps } from "../types"
import { SliderExtended, SwitchExtended } from "@/components/react"

export const PieConfig: FC<ChartConfigProps<"pie">> = ({
  config,
  setConfig,
}) => (
  <div className="space-y-2">
    <ConfigSection label="Pie Design">
      <div className="flex items-start space-x-2">
        <SliderExtended
          className="flex-1"
          label="Start Angle"
          description="To make it gauges"
          max={360}
          min={-360}
          step={0.01}
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
          step={0.01}
          defaultValue={0}
          value={config.endAngle}
          onChange={(val) => setConfig({ endAngle: val })}
        />
      </div>
      <div className="flex items-start space-x-2">
        <SliderExtended
          className="flex-1"
          label="Inner Radius"
          description="Make your pie to a donut"
          min={0}
          max={0.95}
          step={0.01}
          defaultValue={0}
          value={config.innerRadius}
          onChange={(val) => setConfig({ innerRadius: val })}
        />
        <SliderExtended
          className="flex-1"
          label="Inner Padding"
          description="Padding between each pie slice."
          min={0}
          max={50}
          step={0.01}
          defaultValue={0}
          value={config.padAngle}
          onChange={(val) => setConfig({ padAngle: val })}
        />
      </div>
      <div className="flex items-start space-x-2">
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
        <SliderExtended
          className="flex-1"
          label="Border Width"
          description="Border with for each pie slice"
          min={0}
          max={16}
          step={0.01}
          defaultValue={0}
          value={config.borderWidth}
          onChange={(val) => setConfig({ borderWidth: val })}
        />
      </div>
    </ConfigSection>
    <ConfigSection label="Labels">
      <SwitchExtended
        label="Show Label"
        description="Enable/Disable label inside a pie chart"
        defaultChecked={true}
        checked={config.enableArcLabels}
        onChange={(value) => setConfig({ enableArcLabels: value })}
      />
      <Transition mounted={config.enableArcLabels ?? true} transition="fade">
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
              value={config.arcLabelsRadiusOffset}
              onChange={(val) => setConfig({ arcLabelsRadiusOffset: val })}
            />
            <SliderExtended
              className="flex-1"
              label="Skip Labels"
              description="Hide lable if angle degree is lower"
              min={0}
              max={90}
              step={0.01}
              defaultValue={0}
              value={config.arcLabelsSkipAngle}
              onChange={(val) => setConfig({ arcLabelsSkipAngle: val })}
            />
          </div>
        )}
      </Transition>
      <SwitchExtended
        label="Show Arc Label"
        description="Enable/Disable label outside a pie chart"
        defaultChecked={true}
        checked={config.enableArcLinkLabels}
        onChange={(value) => setConfig({ enableArcLinkLabels: value })}
      />
      <Transition
        transition="fade"
        mounted={config.enableArcLinkLabels ?? true}
      >
        {(styles) => (
          <SliderExtended
            style={styles}
            label="Skip Labels"
            description="Hide lable if angle degree is lower"
            min={0}
            max={360}
            step={0.01}
            defaultValue={0}
            value={config.arcLinkLabelsSkipAngle}
            onChange={(val) => setConfig({ arcLinkLabelsSkipAngle: val })}
          />
        )}
      </Transition>
    </ConfigSection>
  </div>
)
