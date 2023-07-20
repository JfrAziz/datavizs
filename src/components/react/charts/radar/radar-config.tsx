import type { FC } from "react"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import {
  Input,
  SegmentedControl,
  Slider,
  Switch,
  Transition,
} from "@mantine/core"
import { switchHandler } from "../../input"

export const RadarConfig: FC<ChartConfigProps<"radar">> = ({
  config,
  setConfig,
}) => (
  <div className="space-y-2">
    <ConfigSection label="Grid & Shape">
      <Input.Wrapper label="Shape" description="Determine shape of the grid.">
        <SegmentedControl
          defaultValue="circular"
          value={config.gridShape}
          data={["circular", "linear"]}
          onChange={(value: "circular" | "linear") =>
            setConfig({ gridShape: value })
          }
        />
      </Input.Wrapper>
      <Input.Wrapper
        label="Grid Levels"
        description="Number of levels to display for grid"
      >
        <Slider
          min={0}
          max={10}
          step={1}
          defaultValue={5}
          value={config.gridLevels ?? 5}
          label={Number(config.gridLevels ?? 5)}
          onChange={(val) => setConfig({ gridLevels: val })}
        />
      </Input.Wrapper>
    </ConfigSection>
    <ConfigSection label="Styling">
      <Input.Wrapper label="Fill Opacity" description="Opacity each shape">
        <Slider
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.25}
          value={config.fillOpacity ?? 0.25}
          label={Number(config.fillOpacity ?? 0.25)}
          onChange={(val) => setConfig({ fillOpacity: val })}
        />
      </Input.Wrapper>
      <Input.Wrapper
        label="Border Width"
        description="Set border with for each shape"
      >
        <Slider
          min={0}
          max={10}
          step={0.1}
          defaultValue={2}
          value={config.borderWidth ?? 2}
          label={Number(config.borderWidth ?? 2).toFixed(1)}
          onChange={(val) => setConfig({ borderWidth: val })}
        />
      </Input.Wrapper>
      <Input.Wrapper
        label="Show Dots"
        description="Enable/Disable dots on the edge of each pieces"
      >
        <Switch
          defaultChecked
          checked={config.enableDots}
          onChange={(e) =>
            setConfig({
              enableDots: switchHandler(e, config.enableDots),
            })
          }
        />
      </Input.Wrapper>
      <Transition transition="fade" mounted={config.enableDots ?? true}>
        {(styles) => (
          <div style={styles} className="space-y-2">
            <div className="flex items-start space-x-2">
              <Input.Wrapper
                className="flex-1"
                label="Dot Size"
                description="Size of the dots"
              >
                <Slider
                  min={0}
                  max={90}
                  step={0.01}
                  defaultValue={6}
                  value={config.dotSize}
                  label={Number(config.dotSize ?? 6).toFixed(1)}
                  onChange={(val) => setConfig({ dotSize: val })}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label="Show Dots Labels"
                description="Enable/Disable label in the dots"
              >
                <Switch
                  checked={config.enableDotLabel}
                  onChange={(e) =>
                    setConfig({
                      enableDotLabel: switchHandler(e, config.enableDotLabel),
                    })
                  }
                />
              </Input.Wrapper>
            </div>
            <Transition
              transition="fade"
              mounted={config.enableDotLabel ?? false}
            >
              {(styles) => (
                <Input.Wrapper
                  style={styles}
                  className="flex-1"
                  label="Dot Labels Offset"
                  description="Offset of labels to the dot"
                >
                  <Slider
                    min={-36}
                    max={36}
                    step={0.01}
                    defaultValue={-12}
                    value={config.dotLabelYOffset}
                    label={Number(config.dotLabelYOffset ?? 6).toFixed(1)}
                    onChange={(val) => setConfig({ dotLabelYOffset: val })}
                  />
                </Input.Wrapper>
              )}
            </Transition>
          </div>
        )}
      </Transition>
    </ConfigSection>
  </div>
)
