import type { FC } from "react"
import { Transition } from "@mantine/core"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import {
  SliderExtended,
  SwitchExtended,
  SegmentedControlExtended,
} from "@/components/react"

export const BumpConfig: FC<ChartConfigProps<"bump">> = ({
  config,
  setConfig,
}) => (
  <div>
    <ConfigSection label="Chart Layout">
      <SegmentedControlExtended<"smooth" | "linear">
        label="Interpolation"
        description="Line interpolation"
        value={config.interpolation}
        defaultValue="smooth"
        data={["smooth", "linear"]}
        onChange={(value) => setConfig({ interpolation: value })}
      />
      <div className="flex items-start space-x-2">
        <SliderExtended
          className="flex-1"
          label="X Outer Padding"
          description="X Padding outside of charts"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.6}
          value={config.xOuterPadding}
          onChange={(val) => setConfig({ xOuterPadding: val })}
        />
        <SliderExtended
          className="flex-1"
          label="Y Outer Padding"
          description="Y Padding outside of charts"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.6}
          value={config.yOuterPadding}
          onChange={(val) => setConfig({ yOuterPadding: val })}
        />
      </div>
      <SliderExtended
        label="X Padding"
        description="Padding between X data"
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.6}
        value={config.xPadding}
        onChange={(val) => setConfig({ xPadding: val })}
      />
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
          label="Line Width"
          description="Line Width"
          min={0}
          max={20}
          step={0.1}
          defaultValue={2}
          value={config.lineWidth}
          onChange={(val) => setConfig({ lineWidth: val })}
        />
        <SliderExtended
          className="flex-1"
          label="Line Opacity"
          description="Make it transparent"
          min={0}
          max={1}
          step={0.01}
          defaultValue={1}
          value={config.opacity}
          onChange={(val) => setConfig({ opacity: val })}
        />
      </div>
      <div className="flex items-start space-x-2">
        <SliderExtended
          className="flex-1"
          label="Point Size"
          description="Point size"
          min={0}
          max={20}
          step={0.1}
          defaultValue={6}
          value={config.pointSize}
          onChange={(val) => setConfig({ pointSize: val })}
        />
        <SliderExtended
          className="flex-1"
          label="Point Border Size"
          description="Border size on point"
          min={0}
          max={5}
          step={1}
          defaultValue={0}
          value={config.pointBorderWidth}
          onChange={(val) =>
            setConfig({ activePointBorderWidth: val, pointBorderWidth: val })
          }
        />
      </div>
    </ConfigSection>
  </div>
)
