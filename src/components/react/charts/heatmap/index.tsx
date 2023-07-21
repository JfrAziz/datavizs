import { HeatMapConfig } from "./heatmap-config"
import type { Chart, Dimensions } from "../types"
import { RadialBarSvgProps, ResponsiveRadialBar } from "@nivo/radial-bar"
import { ResponsiveHeatMap, type HeatMapSvgProps } from "@nivo/heatmap"

type HeatMapDimension = "x" | "y" | "groupBy"

const heatMapDimension: Dimensions<HeatMapDimension> = {
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

export const HeatMapChart: Chart<
  Omit<HeatMapSvgProps<any, any>, "width" | "height">,
  HeatMapDimension
> = {
  Component: ResponsiveHeatMap,

  Config: HeatMapConfig,

  dimensions: heatMapDimension,

  transfomer: (data, dimensions) => data,

  defaultConfig: {},
}
