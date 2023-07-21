import { PieConfig } from "./pie-config"
import { Pie, ResponsivePie, type PieSvgProps } from "@nivo/pie"
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

export const PieChart: Chart<
  Omit<PieSvgProps<any>, "width" | "height">,
  PieChartDimensions
> = {
  Component: ResponsivePie,

  Config: PieConfig,

  dimensions: pieChartDimensions,

  transfomer: (data, args) => data,

  defaultConfig: {
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    activeOuterRadiusOffset: 8,
  },
}
