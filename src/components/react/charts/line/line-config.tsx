import type { FC } from "react"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import { switchHandler } from "@/components/react"
import { Input, Slider, Switch, Transition, NativeSelect } from "@mantine/core"

export const LineConfig: FC<ChartConfigProps<"line">> = ({
  config,
  setConfig,
}) => (
  <div>
    <ConfigSection label="Chart Layout">
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
          label="Stacked"
          description="Stack the line on top each others"
        >
          <Switch
            checked={(config.yScale as any).stacked ?? false}
            onChange={(e) =>
              setConfig({
                yScale: {
                  type: "linear",
                  stacked: switchHandler(e, (config.yScale as any).stacked),
                },
              })
            }
          />
        </Input.Wrapper>
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
      <Input.Wrapper
        label="Chart Area"
        description="Enable/Disable area below the line"
      >
        <Switch
          checked={config.enableArea}
          onChange={(e) =>
            setConfig({
              enableArea: switchHandler(e, config.enableArea),
            })
          }
        />
      </Input.Wrapper>
      <Transition transition="fade" mounted={config.enableArea ?? false}>
        {(styles) => (
          <div style={styles} className="space-y-2">
            <Input.Wrapper
              className="flex-1"
              label="Area Opacity"
              description="Opacity of area below the line"
            >
              <Slider
                min={0}
                max={1}
                step={0.01}
                defaultValue={0.2}
                value={config.areaOpacity}
                label={Number(config.areaOpacity ?? 0.2).toFixed(1)}
                onChange={(val) => setConfig({ areaOpacity: val })}
              />
            </Input.Wrapper>
          </div>
        )}
      </Transition>
    </ConfigSection>
    <ConfigSection label="Labels">
      <Input.Wrapper
        label="Show Point"
        description="Enable/Disable Point on the edge of each pieces"
      >
        <Switch
          checked={config.enablePoints}
          onChange={(e) =>
            setConfig({
              enablePoints: switchHandler(e, config.enablePoints),
            })
          }
        />
      </Input.Wrapper>
      <Transition transition="fade" mounted={config.enablePoints ?? false}>
        {(styles) => (
          <div style={styles} className="space-y-2">
            <div className="flex items-start space-x-2">
              <Input.Wrapper
                className="flex-1"
                label="Point Size"
                description="Size of the Point"
              >
                <Slider
                  min={0}
                  max={90}
                  step={0.01}
                  defaultValue={6}
                  value={config.pointSize}
                  label={Number(config.pointSize ?? 6).toFixed(1)}
                  onChange={(val) => setConfig({ pointSize: val })}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label="Show Point Labels"
                description="Enable/Disable label in the Point"
              >
                <Switch
                  checked={config.enablePointLabel}
                  onChange={(e) =>
                    setConfig({
                      enablePointLabel: switchHandler(
                        e,
                        config.enablePointLabel
                      ),
                    })
                  }
                />
              </Input.Wrapper>
            </div>
            <Transition
              transition="fade"
              mounted={config.enablePointLabel ?? false}
            >
              {(styles) => (
                <Input.Wrapper
                  style={styles}
                  className="flex-1"
                  label="Point Labels Offset"
                  description="Offset of labels to the Point"
                >
                  <Slider
                    min={-36}
                    max={36}
                    step={0.1}
                    defaultValue={-12}
                    value={config.pointLabelYOffset}
                    label={Number(config.pointLabelYOffset ?? -12).toFixed(1)}
                    onChange={(val) => setConfig({ pointLabelYOffset: val })}
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
