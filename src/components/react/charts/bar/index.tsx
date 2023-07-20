import { BarConfig } from "./bar-config"
import type { Chart, Dimensions } from "../types"
import { type BarSvgProps, Bar } from "@nivo/bar"

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
  BarSvgProps<Record<string, any>>,
  BarChartDimensions
> = {
  Component: Bar,

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
