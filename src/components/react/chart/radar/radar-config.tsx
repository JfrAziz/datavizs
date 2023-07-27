import type { FC } from "react"
import { Transition } from "@mantine/core"
import { ConfigSection } from "../layouts"
import type { ChartConfigProps } from "../types"
import {
  SliderExtended,
  SwitchExtended,
  SegmentedControlExtended,
} from "@/components/react"

export const RadarConfig: FC<ChartConfigProps<"radar">> = ({
  config,
  setConfig,
}) => (
  <div className="space-y-2">
    <ConfigSection label="Grid & Shape">
      <SegmentedControlExtended<"circular" | "linear">
        label="Shape"
        description="Determine shape of the grid."
        defaultValue="circular"
        value={config.gridShape}
        data={["circular", "linear"]}
        onChange={(value) => setConfig({ gridShape: value })}
      />
      <SliderExtended
        label="Grid Levels"
        description="Number of levels to display for grid"
        min={0}
        max={10}
        step={1}
        defaultValue={5}
        value={config.gridLevels}
        onChange={(val) => setConfig({ gridLevels: val })}
      />
    </ConfigSection>
    <ConfigSection label="Styling">
      <SliderExtended
        label="Fill Opacity"
        description="Opacity each shape"
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.25}
        value={config.fillOpacity}
        onChange={(val) => setConfig({ fillOpacity: val })}
      />
      <SliderExtended
        label="Border Width"
        description="Set border with for each shape"
        min={0}
        max={10}
        step={0.1}
        defaultValue={2}
        value={config.borderWidth}
        onChange={(val) => setConfig({ borderWidth: val })}
      />
      <SwitchExtended
        label="Show Dots"
        description="Enable/Disable dots on the edge of each pieces"
        defaultChecked={true}
        checked={config.enableDots}
        onChange={(value) => setConfig({ enableDots: value })}
      />
      <Transition transition="fade" mounted={config.enableDots ?? true}>
        {(styles) => (
          <div style={styles} className="space-y-2">
            <div className="flex items-start space-x-2">
              <SliderExtended
                className="flex-1"
                label="Dot Size"
                description="Size of the dots"
                min={0}
                max={90}
                step={0.01}
                defaultValue={6}
                value={config.dotSize}
                onChange={(val) => setConfig({ dotSize: val })}
              />
              <SwitchExtended
                label="Show Dots Labels"
                description="Enable/Disable label in the dots"
                defaultChecked={false}
                checked={config.enableDotLabel}
                onChange={(value) => setConfig({ enableDotLabel: value })}
              />
            </div>
            <Transition
              transition="fade"
              mounted={config.enableDotLabel ?? false}
            >
              {(styles) => (
                <SliderExtended
                  style={styles}
                  label="Dot Labels Offset"
                  description="Offset of labels to the dot"
                  min={-36}
                  max={36}
                  step={0.1}
                  defaultValue={-12}
                  value={config.dotLabelYOffset}
                  onChange={(val) => setConfig({ dotLabelYOffset: val })}
                />
              )}
            </Transition>
          </div>
        )}
      </Transition>
    </ConfigSection>
  </div>
)
