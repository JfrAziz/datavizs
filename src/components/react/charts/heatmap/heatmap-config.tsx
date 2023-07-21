import type { FC } from "react"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import { switchHandler } from "@/components/react"
import { Input, Slider, Switch } from "@mantine/core"

export const HeatMapConfig: FC<ChartConfigProps<"heatmap">> = ({
  config,
  setConfig,
}) => (
  <div>
    <ConfigSection label="Bar Design">
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="X Inner Padding"
          description="Horizontal padding between box"
        >
          <Slider
            min={0}
            max={1}
            step={0.01}
            defaultValue={0}
            value={config.xInnerPadding ?? 0}
            label={Number(config.xInnerPadding ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ xInnerPadding: val })}
          />
        </Input.Wrapper>
        <Input.Wrapper
          className="flex-1"
          label="Y Inner Padding"
          description="Vertical padding between box"
        >
          <Slider
            min={0}
            max={1}
            step={0.01}
            defaultValue={0}
            value={config.yInnerPadding ?? 0}
            label={Number(config.yInnerPadding ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ yInnerPadding: val })}
          />
        </Input.Wrapper>
      </div>
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="X Outer Padding"
          description="Horizontal padding on the outside"
        >
          <Slider
            min={0}
            max={1}
            step={0.01}
            defaultValue={0}
            value={config.xOuterPadding ?? 0}
            label={Number(config.xOuterPadding ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ xOuterPadding: val })}
          />
        </Input.Wrapper>
        <Input.Wrapper
          className="flex-1"
          label="Y Outer Padding"
          description="Vertical padding padding on the outside"
        >
          <Slider
            min={0}
            max={1}
            step={0.01}
            defaultValue={0}
            value={config.yOuterPadding ?? 0}
            label={Number(config.yOuterPadding ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ yOuterPadding: val })}
          />
        </Input.Wrapper>
      </div>
      <div className="flex items-start space-x-2">
        <Input.Wrapper
          className="flex-1"
          label="Border Radius"
          description="Cell border radius"
        >
          <Slider
            min={0}
            max={16}
            step={0.1}
            defaultValue={0}
            value={config.borderRadius ?? 0}
            label={Number(config.borderRadius ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ borderRadius: val })}
          />
        </Input.Wrapper>
        <Input.Wrapper
          className="flex-1"
          label="Border Width"
          description="Cell border width"
        >
          <Slider
            min={0}
            max={16}
            step={0.1}
            defaultValue={0}
            value={config.borderWidth ?? 0}
            label={Number(config.borderWidth ?? 0).toFixed(1)}
            onChange={(val) => setConfig({ borderWidth: val })}
          />
        </Input.Wrapper>
      </div>
    </ConfigSection>
    <ConfigSection label="Grid">
      <div className="flex space-x-2">
        <Input.Wrapper label="X Grid" description="Enable/Disable X grid">
          <Switch
            defaultChecked
            checked={config.enableGridX}
            onChange={(e) =>
              setConfig({
                enableGridX: switchHandler(e, config.enableGridX),
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
            checked={config.enableGridY}
            onChange={(e) =>
              setConfig({
                enableGridY: switchHandler(e, config.enableGridY),
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
    </ConfigSection>
  </div>
)
