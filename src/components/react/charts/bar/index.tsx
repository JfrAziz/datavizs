import { BarConfig } from "./bar-config"
import type { Chart, Dimensions } from "../types"
import { type BarSvgProps, Bar, ResponsiveBar } from "@nivo/bar"

type BarChartDimensions = "x" | "values"

const barChartDimimensions: Dimensions<BarChartDimensions> = {
  x: {
    max: 1,
    required: true,
    label: "X Axis (index)",
    accept: ["number", "string"],
  },
  values: {
    required: true,
    label: "Y (Values",
    accept: ["number", "string"],
  },
}

export const BarChart: Chart<
  Omit<BarSvgProps<Record<string, any>>, "width" | "height">,
  BarChartDimensions
> = {
  Component: ResponsiveBar,

  Config: BarConfig,

  dimensions: barChartDimimensions,

  transfomer: (data, dimensions) => data,

  defaultConfig: {
    padding: 0.2,
    enableGridY: true,
    enableLabel: true,
    layout: "vertical",
    groupMode: "stacked",
  },
}
