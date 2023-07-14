import { PieConfig } from "./PieConfig"
import { Pie, type PieSvgProps } from "@nivo/pie"
import type { Chart, Dimensions } from "../types"

type PieChartDimensions = "x" | "values"

const pieChartDimensions: Dimensions<PieChartDimensions> = {
  x: {
    max: 1,
    required: true,
    label: "X Axis (index)",
    accept: ["number", "string"],
  },
  values: {
    max: 1,
    required: true,
    label: "Y (Values",
    accept: ["number", "string"],
  },
}

export const PieChart: Chart<PieSvgProps<any>, PieChartDimensions> = {
  Component: Pie,

  Config: PieConfig,

  dimensions: pieChartDimensions,

  transfomer: (data, args) => data,
}
