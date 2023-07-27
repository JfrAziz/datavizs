import { HeatMapConfig } from "./heatmap-config"
import type { Chart, Dimensions } from "../types"
import {
  ResponsiveHeatMap,
  type HeatMapSvgProps,
} from "@/components/react/chart-provider"

type HeatMapDimension = "x" | "y" | "value"

const heatMapDimension: Dimensions<HeatMapDimension> = {
  x: {
    max: 1,
    required: true,
    label: "X Axis",
    accept: ["number", "string"],
  },
  y: {
    max: 1,
    required: true,
    label: "Y Axis",
    accept: ["number", "string"],
  },
  value: {
    max: 1,
    required: true,
    label: "Value",
    accept: ["number", "string"],
  },
}

export const HeatMapChart: Chart<
  Omit<HeatMapSvgProps<any, any>, "width" | "height">,
  HeatMapDimension
> = {
  Component: ResponsiveHeatMap,

  Config: HeatMapConfig,

  dimensions: heatMapDimension,

  defaultConfig: {},

  createDataConfig: (data, dimensions) => {
    const xAxis = dimensions?.x?.[0]

    const yAxis = dimensions?.y?.[0]

    const value = dimensions?.value?.[0] ?? ""

    if (!xAxis || !yAxis) return { data: [] }

    const result: HeatMapSvgProps<any, any>["data"] = []

    const groups = new Set(data.map((item) => item[xAxis]))

    groups.forEach((group: string) => {
      const grouped = data.filter((item) => item[xAxis] === group)
      console.log(grouped)
      result.push({
        id: group,
        data: grouped.map((item) => ({
          x: item[yAxis] ?? null,
          y: item[value] ?? null,
        })),
      })
    })

    return { data: result }
  },

  createThemeConfig: () => ({}),
}
