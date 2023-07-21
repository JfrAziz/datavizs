import type { FC } from "react"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import { switchHandler } from "@/components/react"
import {
  Input,
  Slider,
  Switch,
  Transition,
  SegmentedControl,
} from "@mantine/core"

export const BumpConfig: FC<ChartConfigProps<"bump">> = ({
  config,
  setConfig,
}) => (
  <div>
    <ConfigSection label="Chart Layout">
      <Input.Wrapper
        label="Interpolation"
        description="Line interpolation"
      >
        <SegmentedControl
          value={config.interpolation}
          defaultValue="smooth"
          data={["smooth", "linear"]}
          onChange={(value: "smooth" | "linear") =>
            setConfig({ interpolation: value })
          }
        />
      </Input.Wrapper>
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="X Outer Padding"
          description="X Padding outside of charts"
        >
          <Slider
            min={0}
            max={1}
            step={0.01}
            defaultValue={0.6}
            value={config.xOuterPadding}
            label={Number(config.xOuterPadding ?? 0.6).toFixed(1)}
            onChange={(val) => setConfig({ xOuterPadding: val })}
          />
        </Input.Wrapper>
        <Input.Wrapper
          className="flex-1"
          label="Y Outer Padding"
          description="Y Padding outside of charts"
        >
          <Slider
            min={0}
            max={1}
            step={0.01}
            defaultValue={0.6}
            value={config.yOuterPadding}
            label={Number(config.yOuterPadding ?? 0.6).toFixed(1)}
            onChange={(val) => setConfig({ yOuterPadding: val })}
          />
        </Input.Wrapper>
      </div>
      <Input.Wrapper label="X Padding" description="Padding between X data">
        <Slider
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.6}
          value={config.xPadding}
          label={Number(config.xPadding ?? 0.6).toFixed(1)}
          onChange={(val) => setConfig({ xPadding: val })}
        />
      </Input.Wrapper>
    </ConfigSection>
    <ConfigSection label="Labels">
      <Input.Wrapper
        label="Show Start Label"
        description="Enable/disable label at the start of charts"
      >
        <Switch
          checked={!!config.startLabel ?? false}
          onChange={(e) =>
            setConfig({
              startLabel: switchHandler(e, !!config.startLabel),
            })
          }
        />
      </Input.Wrapper>
      <Transition transition="fade" mounted={!!config.startLabel ?? false}>
        {(styles) => (
          <Input.Wrapper
            style={styles}
            label="Start Label Offset"
            description="Offset of end label from line start"
          >
            <Slider
              min={0}
              max={36}
              step={0.1}
              defaultValue={16}
              value={config.startLabelPadding}
              label={Number(config.startLabelPadding ?? 16).toFixed(1)}
              onChange={(val) => setConfig({ startLabelPadding: val })}
            />
          </Input.Wrapper>
        )}
      </Transition>
      <Input.Wrapper
        label="Show End Label"
        description="Enable/disable label at end of charts"
      >
        <Switch
          checked={!!config.endLabel ?? false}
          onChange={(e) =>
            setConfig({
              endLabel: switchHandler(e, !!config.endLabel),
            })
          }
        />
      </Input.Wrapper>
      <Transition transition="fade" mounted={!!config.endLabel ?? false}>
        {(styles) => (
          <Input.Wrapper
            style={styles}
            label="End Label Offset"
            description="Offset of end label from line end"
          >
            <Slider
              min={0}
              max={36}
              step={0.1}
              defaultValue={16}
              value={config.endLabelPadding}
              label={Number(config.endLabelPadding ?? 16).toFixed(1)}
              onChange={(val) => setConfig({ endLabelPadding: val })}
            />
          </Input.Wrapper>
        )}
      </Transition>
    </ConfigSection>
    <ConfigSection label="Lines & Point">
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="Line Width"
          description="Line Width"
        >
          <Slider
            min={0}
            max={20}
            step={0.1}
            defaultValue={2}
            value={config.lineWidth}
            label={Number(config.lineWidth ?? 2).toFixed(1)}
            onChange={(val) => setConfig({ lineWidth: val })}
          />
        </Input.Wrapper>
        <Input.Wrapper
          className="flex-1"
          label="Line Opacity"
          description="Make it transparent"
        >
          <Slider
            min={0}
            max={1}
            step={0.01}
            defaultValue={1}
            value={config.opacity}
            label={Number(config.lineWidth ?? 1).toFixed(1)}
            onChange={(val) => setConfig({ opacity: val })}
          />
        </Input.Wrapper>
      </div>
      <Input.Wrapper
        className="flex-1"
        label="Point Size"
        description="Intersection point size"
      >
        <Slider
          min={0}
          max={20}
          step={0.1}
          defaultValue={6}
          value={config.pointSize}
          label={Number(config.pointSize ?? 6).toFixed(1)}
          onChange={(val) => setConfig({ pointSize: val })}
        />
      </Input.Wrapper>
    </ConfigSection>
  </div>
)
