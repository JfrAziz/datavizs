import type { FC } from "react"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import { ColorTextInput, switchHandler } from "@/components/react"
import {
  Input,
  Slider,
  Switch,
  SegmentedControl,
  Transition,
} from "@mantine/core"

export const BarConfig: FC<ChartConfigProps<"bar">> = ({
  config,
  setConfig,
}) => {
  return (
    <div className="space-y-2">
      <ConfigSection label="Chart Layout">
        <div className="flex flex-wrap">
          <Input.Wrapper
            label="Grouping Mode"
            description="How the data grouped"
          >
            <SegmentedControl
              defaultValue="stacked"
              value={config.groupMode}
              data={["stacked", "grouped"]}
              onChange={(value: "grouped" | "stacked") =>
                setConfig({ groupMode: value })
              }
            />
          </Input.Wrapper>
          <Input.Wrapper
            label="Orientation"
            description="Orientation of the charts"
          >
            <SegmentedControl
              value={config.layout}
              defaultValue="vertical"
              data={["vertical", "horizontal"]}
              onChange={(value: "horizontal" | "vertical") =>
                setConfig({ layout: value })
              }
            />
          </Input.Wrapper>
        </div>
        <Input.Wrapper
          label="Reversed"
          description="Reverse bars, starts on top or right based on orientation."
        >
          <Switch
            checked={config.reverse}
            onChange={(e) =>
              setConfig({
                reverse: switchHandler(e, config.reverse),
              })
            }
          />
        </Input.Wrapper>
      </ConfigSection>
      <ConfigSection label="Chart Padding">
        <div className="flex items-start space-x-2">
          <Input.Wrapper
            label="Padding"
            className="flex-1"
            description="Padding between each bar"
          >
            <Slider
              min={0}
              max={1}
              step={0.1}
              defaultValue={0.2}
              value={config.padding ?? 0.2}
              label={Number(config.padding).toFixed(1)}
              onChange={(val) => setConfig({ padding: val })}
            />
          </Input.Wrapper>
          <Input.Wrapper
            className="flex-1"
            label="Inner Padding"
            description="Padding between bars."
          >
            <Slider
              min={0}
              max={100}
              step={1}
              defaultValue={0}
              value={config.innerPadding ?? 0}
              label={Number(config.innerPadding).toFixed(1)}
              onChange={(val) => setConfig({ innerPadding: val })}
            />
          </Input.Wrapper>
        </div>
      </ConfigSection>
      <ConfigSection label="Labels">
        <div className="flex items-start space-x-2">
          <Input.Wrapper
            label="Show Label"
            description="Enable/Disable label on chart"
          >
            <Switch
              defaultChecked
              checked={config.enableLabel}
              onChange={(e) =>
                setConfig({
                  enableLabel: switchHandler(e, config.enableLabel),
                })
              }
            />
          </Input.Wrapper>
          <Transition mounted={config.enableLabel ?? true} transition="fade">
            {(styles) => (
              <div style={styles}>
                <ColorTextInput
                  label="Color"
                  description="Set the label color"
                  value={config.labelTextColor?.toString() ?? "#000000"}
                  onChange={(val) => setConfig({ labelTextColor: val })}
                />
              </div>
            )}
          </Transition>
        </div>
      </ConfigSection>
      <ConfigSection label="Grid & Axes">
        <div className="flex space-x-2">
          <Input.Wrapper label="X Grid" description="Enable/Disable X grid">
            <Switch
              checked={config.enableGridX}
              onChange={(e) =>
                setConfig({
                  enableGridX: switchHandler(e, config.enableGridX),
                })
              }
            />
          </Input.Wrapper>
          <Input.Wrapper label="Y Grid" description="Enable/Disable Y grid">
            <Switch
              checked={config.enableGridY}
              defaultChecked
              onChange={(e) =>
                setConfig({
                  enableGridY: switchHandler(e, config.enableGridY),
                })
              }
            />
          </Input.Wrapper>
        </div>
      </ConfigSection>
    </div>
  )
}
