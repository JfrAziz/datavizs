import type { FC } from "react"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import { switchHandler } from "@/components/react"
import { Input, Slider, Switch, Transition } from "@mantine/core"

export const PieConfig: FC<ChartConfigProps<"pie">> = ({
  config,
  setConfig,
}) => (
  <div className="space-y-2">
    <ConfigSection label="Pie Design">
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="Start Angle"
          description="To make it gauges"
        >
          <Slider
            max={360}
            min={-360}
            step={0.01}
            defaultValue={0}
            value={config.startAngle ?? 0}
            label={Number(config.startAngle ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ startAngle: val })}
          />
        </Input.Wrapper>
        <Input.Wrapper
          className="flex-1"
          label="End Angle"
          description="To make it gauges"
        >
          <Slider
            max={360}
            min={-360}
            step={0.01}
            defaultValue={0}
            value={config.endAngle ?? 0}
            label={Number(config.endAngle ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ endAngle: val })}
          />
        </Input.Wrapper>
      </div>
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="Inner Radius"
          description="Make your pie to a donut"
        >
          <Slider
            min={0}
            max={0.95}
            step={0.01}
            defaultValue={0}
            value={config.innerRadius ?? 0}
            label={Number(config.innerRadius ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ innerRadius: val })}
          />
        </Input.Wrapper>
        <Input.Wrapper
          className="flex-1"
          label="Inner Padding"
          description="Padding between each pie slice."
        >
          <Slider
            min={0}
            max={50}
            step={0.01}
            defaultValue={0}
            value={config.padAngle ?? 0}
            label={Number(config.padAngle ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ padAngle: val })}
          />
        </Input.Wrapper>
      </div>
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="Corner Radius"
          description="Corner radius each pie slice"
        >
          <Slider
            min={0}
            max={100}
            step={0.01}
            defaultValue={0}
            value={config.cornerRadius ?? 0}
            label={Number(config.cornerRadius ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ cornerRadius: val })}
          />
        </Input.Wrapper>
        <Input.Wrapper
          label="Border"
          className="flex-1"
          description="Border with for each pie slice"
        >
          <Slider
            min={0}
            max={5}
            step={0.01}
            defaultValue={0}
            value={config.borderWidth ?? 0}
            label={Number(config.borderWidth ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ borderWidth: val })}
          />
        </Input.Wrapper>
      </div>
    </ConfigSection>
    <ConfigSection label="Labels">
      <Input.Wrapper
        label="Show Label"
        description="Enable/Disable label inside a pie chart"
      >
        <Switch
          defaultChecked
          checked={config.enableArcLabels}
          onChange={(e) =>
            setConfig({
              enableArcLabels: switchHandler(e, config.enableArcLabels),
            })
          }
        />
      </Input.Wrapper>
      <Transition mounted={config.enableArcLabels ?? true} transition="fade">
        {(styles) => (
          <div style={styles} className="flex items-start space-x-2">
            <Input.Wrapper
              className="flex-1"
              label="Label offset"
              description="Offset from center"
            >
              <Slider
                min={0}
                max={1.2}
                step={0.01}
                defaultValue={0.5}
                value={config.arcLabelsRadiusOffset ?? 0.5}
                label={Number(config.arcLabelsRadiusOffset ?? 0.5).toFixed(1)}
                onChange={(val) => setConfig({ arcLabelsRadiusOffset: val })}
              />
            </Input.Wrapper>
            <Input.Wrapper
              className="flex-1"
              label="Skip Labels"
              description="Hide lable if angle degree is lower"
            >
              <Slider
                min={0}
                max={90}
                step={0.01}
                defaultValue={0}
                value={config.arcLabelsSkipAngle ?? 0}
                label={Number(config.arcLabelsSkipAngle ?? 0).toFixed(1)}
                onChange={(val) => setConfig({ arcLabelsSkipAngle: val })}
              />
            </Input.Wrapper>
          </div>
        )}
      </Transition>
      <Input.Wrapper
        label="Show Arc Label"
        description="Enable/Disable label outside a pie chart"
      >
        <Switch
          defaultChecked
          checked={config.enableArcLinkLabels}
          onChange={(e) =>
            setConfig({
              enableArcLinkLabels: switchHandler(e, config.enableArcLinkLabels),
            })
          }
        />
      </Input.Wrapper>
      <Transition
        transition="fade"
        mounted={config.enableArcLinkLabels ?? true}
      >
        {(styles) => (
          <Input.Wrapper
            style={styles}
            className="flex-1"
            label="Skip Labels"
            description="Hide lable if angle degree is lower"
          >
            <Slider
              min={0}
              max={360}
              step={0.01}
              defaultValue={0}
              value={config.arcLinkLabelsSkipAngle}
              label={Number(config.arcLinkLabelsSkipAngle ?? 0).toFixed(1)}
              onChange={(val) => setConfig({ arcLinkLabelsSkipAngle: val })}
            />
          </Input.Wrapper>
        )}
      </Transition>
    </ConfigSection>
  </div>
)
