import { LineConfig } from "./line-config"
import type { Chart, Dimensions } from "../types"
import { Line, ResponsiveLine, type LineSvgProps } from "@nivo/line"

type LineDimension = "x" | "y" | "groupBy"

const lineDimension: Dimensions<LineDimension> = {
  x: {
    max: 1,
    required: true,
    label: "Dimension",
    accept: ["number", "string"],
  },
  y: {
    required: true,
    label: "Items",
    accept: ["number", "string"],
  },
  groupBy: {
    required: true,
    label: "Items",
    accept: ["number", "string"],
  },
}

export const LineChart: Chart<LineSvgProps, LineDimension> = {
  Component: (props: LineSvgProps) => <ResponsiveLine {...props} />,

  Config: LineConfig,

  dimensions: lineDimension,

  transfomer: (data, dimensions) => data,

  defaultConfig: {
    useMesh: true,
    xScale: {
      type: "point",
    },
    yScale: {
      type: "linear",
      stacked: false,
      max: "auto",
      min: "auto"
    },
    curve: "basis"
  },
}
