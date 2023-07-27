import { AreaBumpConfig } from "./areabump-config"
import type { Chart, Dimensions } from "../types"
import {
  AreaBumpSvgProps,
  ResponsiveAreaBump,
} from "@/components/react/chart-provider"

type AreaBumpDimension = "x" | "y" | "groupBy"

const areaBumpDimension: Dimensions<AreaBumpDimension> = {
  groupBy: {
    max: 1,
    required: true,
    label: "Group By",
    accept: ["number", "string"],
  },
  x: {
    max: 1,
    required: true,
    label: "X",
    accept: ["number", "string"],
  },
  y: {
    max: 1,
    required: true,
    label: "Value",
    accept: ["number", "string"],
  },
}

export const AreaBumpChart: Chart<
  Omit<AreaBumpSvgProps<any, Record<string, any>>, "width" | "height">,
  AreaBumpDimension
> = {
  Component: ResponsiveAreaBump,

  Config: AreaBumpConfig,

  dimensions: areaBumpDimension,

  defaultConfig: {},

  createDataConfig: (data, dimensions) => {
    const groupBy = dimensions?.groupBy?.[0]

    const x = dimensions?.x?.[0]

    const y = dimensions?.y?.[0] ?? ""

    if (!groupBy || !x) return { data: [] }

    const result: AreaBumpSvgProps<any, Record<string, any>>["data"] = []

    const groups = new Set(data.map((item) => item[groupBy]))

    groups.forEach((group: string) => {
      const grouped = data.filter((item) => item[groupBy] === group)
      result.push({
        id: group,
        data: grouped.map((item) => ({
          x: item[x] ?? null,
          y: item[y] ?? null,
        })),
      })
    })

    return { data: result }
  },

  createThemeConfig: () => ({}),
}
