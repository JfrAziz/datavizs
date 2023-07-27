import type { Chart, Dimensions } from "../types"
import { RadialBarConfig } from "./radialbar-config"
import {
  RadialBarSvgProps,
  ResponsiveRadialBar,
} from "@/components/react/chart-provider"

type RadialBarDimension = "group" | "subgroup" | "value"

const radialBarDimension: Dimensions<RadialBarDimension> = {
  group: {
    max: 1,
    required: false,
    label: "Grouped By",
    accept: ["number", "string"],
  },
  subgroup: {
    max: 1,
    required: true,
    label: "Sub Group",
    accept: ["number", "string"],
  },
  value: {
    max: 1,
    required: true,
    label: "Value",
    accept: ["number", "string"],
  },
}

export const RadialBarChart: Chart<
  Omit<RadialBarSvgProps, "width" | "height">,
  RadialBarDimension
> = {
  Component: ResponsiveRadialBar,

  Config: RadialBarConfig,

  dimensions: radialBarDimension,

  defaultConfig: {},

  createDataConfig: (data, dimensions) => {
    const groupCol = dimensions?.group?.[0]

    const subGroup = dimensions?.subgroup?.[0]

    const value = dimensions?.value?.[0] ?? ""

    if (!groupCol || !subGroup) return { data: [] }

    const result: RadialBarSvgProps["data"] = []

    const groups = new Set(data.map((item) => item[groupCol]))

    groups.forEach((group: string) => {
      const grouped = data.filter((item) => item[groupCol] === group)
      console.log(grouped)
      result.push({
        id: group,
        data: grouped.map((item) => ({
          x: item[subGroup] ?? null,
          y: item[value] ?? null,
        })),
      })
    })

    return { data: result }
  },

  createThemeConfig: () => ({}),
}
