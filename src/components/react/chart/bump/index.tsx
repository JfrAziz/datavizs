import { BumpConfig } from "./bump-config"
import type { Chart, Dimensions } from "../types"
import {
  ResponsiveBump,
  type BumpSvgProps,
} from "@/components/react/chart-provider"

type BumpDimension = "x" | "y" | "groupBy"

const bumpDimension: Dimensions<BumpDimension> = {
  groupBy: {
    max: 1,
    required: true,
    label: "Items",
    accept: ["number", "string"],
  },
  x: {
    max: 1,
    required: true,
    label: "Dimension",
    accept: ["number", "string"],
  },
  y: {
    max: 1,
    required: true,
    label: "Value",
    accept: ["number", "string"],
  },
}

export const BumpChart: Chart<
  Omit<BumpSvgProps<any, Record<string, any>>, "width" | "height">,
  BumpDimension
> = {
  Component: ResponsiveBump,

  Config: BumpConfig,

  dimensions: bumpDimension,

  defaultConfig: {},

  createDataConfig: (data, dimensions) => {
    const groupBy = dimensions?.groupBy?.[0]

    const x = dimensions?.x?.[0]

    const y = dimensions?.y?.[0] ?? ""

    if (!groupBy || !x) return { data: [] }

    // sort the data, before parsing to data 
    const xValues = new Set(data.map((item) => item[x]))

    let dataSource: Record<string, any>[] = []

    xValues.forEach((xValue) => {
      const grouped = data.filter((item) => item[x] === xValue)

      const sorted = grouped
        .sort((a, b) => Number(b[y]) - Number(a[y]))
        .map((item, i) => ({ ...item, [y]: i + 1 }))

      dataSource = dataSource.concat(sorted)
    })

    // transform data source to grouped data
    const result: BumpSvgProps<any, Record<string, any>>["data"] = []

    const groups = new Set(dataSource.map((item) => item[groupBy]))

    groups.forEach((group: string) => {
      const grouped = dataSource.filter((item) => item[groupBy] === group)
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
