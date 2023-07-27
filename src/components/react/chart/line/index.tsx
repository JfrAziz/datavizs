import { LineConfig } from "./line-config"
import type { Chart, Dimensions } from "../types"
import {
  ResponsiveLine,
  type LineSvgProps,
} from "@/components/react/chart-provider"

type LineDimension = "x" | "y" | "groupBy"

const lineDimension: Dimensions<LineDimension> = {
  x: {
    max: 1,
    required: true,
    label: "X",
    accept: ["number", "string"],
  },
  y: {
    max: 1,
    required: true,
    label: "Y Value",
    accept: ["number", "string"],
  },
  groupBy: {
    max: 1,
    required: false,
    label: "Grop By",
    accept: ["number", "string"],
  },
}

export const LineChart: Chart<LineSvgProps, LineDimension> = {
  Component: (props: LineSvgProps) => <ResponsiveLine {...props} />,

  Config: LineConfig,

  dimensions: lineDimension,

  defaultConfig: {
    useMesh: true,
    xScale: {
      type: "point",
    },
    yScale: {
      type: "linear",
      stacked: false,
      max: "auto",
      min: "auto",
    },
    curve: "basis",
  },

  createDataConfig: (data, dimensions) => {
    const groupBy = dimensions?.groupBy?.[0]

    const x = dimensions?.x?.[0]

    const y = dimensions?.y?.[0] ?? ""

    if (!x) return { data: [] }

    // prettier-ignore
    if (!groupBy) return { data: [{
      id: `${x} - ${y}`,
      data: data.map((item) => ({
        x: item[x] ?? null,
        y: item[y] ?? null,
      })),
    }]}

    const result: LineSvgProps["data"] = []

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
