import { LineConfig } from "../line/line-config"
import type { Chart, Dimensions } from "../types"
import { RadialBarSvgProps, ResponsiveRadialBar } from "@nivo/radial-bar"
import { RadialBarConfig } from "./radialbar-config"

type RadialBarDimension = "x" | "y" | "groupBy"

const radialBarDimension: Dimensions<RadialBarDimension> = {
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

export const RadialBarChart: Chart<
  Omit<RadialBarSvgProps, "width" | "height">,
  RadialBarDimension
> = {
  Component: ResponsiveRadialBar,

  Config: RadialBarConfig,

  dimensions: radialBarDimension,

  transfomer: (data, dimensions) => data,

  defaultConfig: {
   
  },
}
