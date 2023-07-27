import { BarConfig } from "./bar-config"
import { dataFilter } from "@/utils/column"
import type { Chart, Dimensions } from "../types"
import {
  type BarSvgProps,
  ResponsiveBar,
} from "@/components/react/chart-provider"

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

  defaultConfig: {
    padding: 0.2,
    enableGridY: true,
    enableLabel: true,
    layout: "vertical",
    groupMode: "stacked",
  },

  createDataConfig: (dataSource, dimensions) => ({
    indexBy: dimensions.x?.[0],
    keys: dimensions.values ?? [],
    data: dataFilter(dataSource, [...dimensions.x, ...dimensions.values]),
  }),

  createThemeConfig: () => ({}),
}

export default BarChart
