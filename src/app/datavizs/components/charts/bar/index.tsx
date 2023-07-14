import { BarConfig } from "./BarConfig"
import type { Chart, Dimensions } from "../types"
import { type BarSvgProps, Bar } from "@nivo/bar"
import type { FlatObject } from "@/app/datavizs/types"

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

export const BarChart: Chart<BarSvgProps<FlatObject>, BarChartDimensions> = {
  Component: Bar,

  Config: BarConfig,

  dimensions: barChartDimimensions,

  transfomer: (data, args) => data,
}
