import type { FC } from "react"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import { switchHandler } from "@/components/react"
import { Input, Slider, Switch, Transition, NativeSelect } from "@mantine/core"

export const RadialBarConfig: FC<ChartConfigProps<"radialbar">> = ({
  config,
  setConfig,
}) => (
  <div>
    <ConfigSection label="Bar Design">
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="Start Angle"
          description="To make it gauges"
        >
          <Slider
            max={360}
            min={-360}
            step={0.1}
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
            step={0.1}
            defaultValue={270}
            value={config.endAngle ?? 270}
            label={Number(config.endAngle ?? 270).toFixed(1)}
            onChange={(val) => setConfig({ endAngle: val })}
          />
        </Input.Wrapper>
      </div>
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="Padding Angle"
          description="Padding between each bar."
        >
          <Slider
            min={0}
            max={180}
            step={0.1}
            defaultValue={0}
            value={config.padAngle ?? 0}
            label={Number(config.padAngle ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ padAngle: val })}
          />
        </Input.Wrapper>
        <Input.Wrapper
          label="Padding"
          className="flex-1"
          description="Padding between each ring (ratio)"
        >
          <Slider
            min={0}
            max={0.9}
            step={0.01}
            defaultValue={0.2}
            value={config.padding ?? 0.2}
            label={Number(config.padding ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ padding: val })}
          />
        </Input.Wrapper>
      </div>
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="Inner Radius"
          description="Radius from the center"
        >
          <Slider
            min={0}
            max={0.95}
            step={0.01}
            defaultValue={0.3}
            value={config.innerRadius ?? 0.3}
            label={Number(config.innerRadius ?? 0.3).toFixed(1)}
            onChange={(val) => setConfig({ innerRadius: val })}
          />
        </Input.Wrapper>
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
      </div>
      <Input.Wrapper
        label="Border"
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
    </ConfigSection>
    <ConfigSection label="Grid">
      <Input.Wrapper label="Tracks" description="Enable/Disable tracks">
        <Switch
          defaultChecked
          checked={config.enableTracks}
          onChange={(e) =>
            setConfig({
              enableTracks: switchHandler(e, config.enableTracks),
            })
          }
        />
      </Input.Wrapper>
      <div className="flex space-x-2">
        <Input.Wrapper
          label="Radial Grid"
          description="Enable/Disable radial grid"
        >
          <Switch
            defaultChecked
            checked={config.enableRadialGrid}
            onChange={(e) =>
              setConfig({
                enableRadialGrid: switchHandler(e, config.enableRadialGrid),
              })
            }
          />
        </Input.Wrapper>
        <Input.Wrapper
          label="Circular Grid"
          description="Enable/Disable cicular grid"
        >
          <Switch
            defaultChecked
            checked={config.enableCircularGrid}
            onChange={(e) =>
              setConfig({
                enableCircularGrid: switchHandler(e, config.enableCircularGrid),
              })
            }
          />
        </Input.Wrapper>
      </div>
    </ConfigSection>
    <ConfigSection label="Labels">
      <Input.Wrapper label="Show Labels" description="Enable/Disable labels">
        <Switch
          checked={config.enableLabels}
          onChange={(e) =>
            setConfig({
              enableLabels: switchHandler(e, config.enableLabels),
            })
          }
        />
      </Input.Wrapper>
      <Transition transition="fade" mounted={config.enableLabels ?? false}>
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
                value={config.labelsRadiusOffset ?? 0.5}
                label={Number(config.labelsRadiusOffset ?? 0.5).toFixed(1)}
                onChange={(val) => setConfig({ labelsRadiusOffset: val })}
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
                value={config.labelsSkipAngle ?? 0}
                label={Number(config.labelsSkipAngle ?? 0).toFixed(1)}
                onChange={(val) => setConfig({ labelsSkipAngle: val })}
              />
            </Input.Wrapper>
          </div>
        )}
      </Transition>
    </ConfigSection>
  </div>
)
