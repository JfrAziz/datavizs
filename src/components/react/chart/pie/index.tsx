import { PieConfig } from "./pie-config"
import { dataFilter } from "@/utils/column"
import type { Chart, Dimensions } from "../types"
import {
  ResponsivePie,
  type PieSvgProps,
} from "@/components/react/chart-provider"

type PieChartDimensions = "x" | "value"

const pieChartDimensions: Dimensions<PieChartDimensions> = {
  x: {
    max: 1,
    required: true,
    label: "X",
    accept: ["number", "string"],
  },
  value: {
    max: 1,
    required: true,
    label: "Value",
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

  defaultConfig: {
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    activeOuterRadiusOffset: 8,
  },

  createDataConfig: (dataSource, dimensions) => ({
    id: dimensions.x?.[0],
    value: dimensions.value?.[0],
    data: dataFilter(dataSource, [...dimensions.x, ...dimensions.value]),
  }),

  createThemeConfig: () => ({}),
}

export default PieChart
