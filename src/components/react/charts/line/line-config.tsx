import type { FC } from "react"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import { Transition, NativeSelect } from "@mantine/core"
import { SliderExtended, SwitchExtended } from "@/components/react"

export const LineConfig: FC<ChartConfigProps<"line">> = ({
  config,
  setConfig,
}) => (
  <div>
    <ConfigSection label="Chart Layout">
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
        <SwitchExtended
          className="flex-1"
          label="Stacked"
          description="Stack the line on top each others"
          defaultChecked={false}
          checked={(config.yScale as any).stacked}
          onChange={(value) =>
            setConfig({
              yScale: {
                type: "linear",
                stacked: value,
              },
            })
          }
        />
      </div>
      <NativeSelect
        label="Curve"
        description="Interpoalte the line"
        value={config.curve}
        onChange={(e) =>
          setConfig({
            curve: e.currentTarget.value as
              | "linear"
              | "basis"
              | "cardinal"
              | "catmullRom"
              | "monotoneX"
              | "monotoneY"
              | "natural"
              | "step"
              | "stepAfter"
              | "stepBefore",
          })
        }
        data={[
          "linear",
          "basis",
          "cardinal",
          "catmullRom",
          "monotoneX",
          "monotoneY",
          "natural",
          "step",
          "stepAfter",
          "stepBefore",
        ]}
      />
      <SwitchExtended
        label="Chart Area"
        description="Enable/Disable area below the line"
        defaultChecked={false}
        checked={config.enableArea}
        onChange={(value) => setConfig({ enableArea: value })}
      />
      <Transition transition="fade" mounted={config.enableArea ?? false}>
        {(styles) => (
          <SliderExtended
            style={styles}
            className="flex-1"
            label="Area Opacity"
            description="Opacity of area below the line"
            min={0}
            max={1}
            step={0.01}
            defaultValue={0.2}
            value={config.areaOpacity}
            onChange={(val) => setConfig({ areaOpacity: val })}
          />
        )}
      </Transition>
    </ConfigSection>
    <ConfigSection label="Labels">
      <SwitchExtended
        label="Show Point"
        description="Enable/Disable Point on the edge of each pieces"
        defaultChecked={false}
        checked={config.enablePoints}
        onChange={(value) => setConfig({ enablePoints: value })}
      />
      <Transition transition="fade" mounted={config.enablePoints ?? false}>
        {(styles) => (
          <div style={styles} className="space-y-2">
            <div className="flex items-start space-x-2">
              <SliderExtended
                className="flex-1"
                label="Point Size"
                description="Size of the Point"
                min={0}
                max={90}
                step={0.01}
                defaultValue={6}
                value={config.pointSize}
                onChange={(val) => setConfig({ pointSize: val })}
              />
              <SwitchExtended
                label="Show Point Labels"
                description="Enable/Disable label in the Point"
                defaultChecked={false}
                checked={config.enablePointLabel}
                onChange={(value) => setConfig({ enablePointLabel: value })}
              />
            </div>
            <Transition
              transition="fade"
              mounted={config.enablePointLabel ?? false}
            >
              {(styles) => (
                <SliderExtended
                  style={styles}
                  label="Point Labels Offset"
                  description="Offset of labels to the Point"
                  min={-36}
                  max={36}
                  step={0.1}
                  defaultValue={-12}
                  value={config.pointLabelYOffset}
                  onChange={(val) => setConfig({ pointLabelYOffset: val })}
                />
              )}
            </Transition>
          </div>
        )}
      </Transition>
    </ConfigSection>
  </div>
)
