import type { FC } from "react"
import { Transition } from "@mantine/core"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import {
  SliderExtended,
  SwitchExtended,
  SegmentedControlExtended,
} from "@/components/react"

export const AreaBumpConfig: FC<ChartConfigProps<"areabump">> = ({
  config,
  setConfig,
}) => (
  <div>
    <ConfigSection label="Chart Layout">
      <SegmentedControlExtended<"smooth" | "linear">
        label="Interpolation"
        description="Area interpolation"
        value={config.interpolation}
        defaultValue="smooth"
        data={["smooth", "linear"]}
        onChange={(value) => setConfig({ interpolation: value })}
      />
      <div className="flex items-start space-x-2">
        <SliderExtended
          label="X Padding"
          className="flex-1"
          description="Padding between X"
          min={0}
          max={1}
          step={0.1}
          defaultValue={0.6}
          value={config.xPadding}
          onChange={(val) => setConfig({ xPadding: val })}
        />
        <SliderExtended
          label="Spacing"
          className="flex-1"
          description="Space between area bump"
          min={0}
          max={50}
          step={0.1}
          defaultValue={0}
          value={config.spacing}
          onChange={(val) => setConfig({ spacing: val })}
        />
      </div>
    </ConfigSection>
    <ConfigSection label="Labels">
      <SwitchExtended
        label="Show Start Label"
        description="Enable/disable label at the start of charts"
        defaultChecked={false}
        checked={!!config.startLabel}
        onChange={(value) => setConfig({ startLabel: value })}
      />
      <Transition transition="fade" mounted={!!config.startLabel ?? false}>
        {(styles) => (
          <SliderExtended
            style={styles}
            label="Start Label Offset"
            description="Offset of end label from line start"
            min={0}
            max={36}
            step={0.1}
            defaultValue={16}
            value={config.startLabelPadding}
            onChange={(val) => setConfig({ startLabelPadding: val })}
          />
        )}
      </Transition>
      <SwitchExtended
        label="Show End Label"
        description="Enable/disable label at end of charts"
        defaultChecked={false}
        checked={!!config.endLabel}
        onChange={(value) => setConfig({ endLabel: value })}
      />
      <Transition transition="fade" mounted={!!config.endLabel ?? false}>
        {(styles) => (
          <SliderExtended
            style={styles}
            label="End Label Offset"
            description="Offset of end label from line end"
            min={0}
            max={36}
            step={0.1}
            defaultValue={16}
            value={config.endLabelPadding}
            onChange={(val) => setConfig({ endLabelPadding: val })}
          />
        )}
      </Transition>
    </ConfigSection>
    <ConfigSection label="Lines & Point">
      <div className="flex items-start space-x-2">
        <SliderExtended
          className="flex-1"
          label="Border Width"
          description="Border width each area"
          min={0}
          max={20}
          step={0.01}
          defaultValue={2}
          value={config.borderWidth}
          onChange={(val) => setConfig({ borderWidth: val })}
        />
        <SliderExtended
          className="flex-1"
          label="Fill Opacity"
          description="Make it transparent"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.8}
          value={config.fillOpacity}
          onChange={(val) => setConfig({ fillOpacity: val })}
        />
      </div>
    </ConfigSection>
  </div>
)
