import { AreaBumpConfig } from "./areabump-config"
import type { Chart, Dimensions } from "../types"
import { AreaBumpSvgProps, ResponsiveAreaBump } from "@nivo/bump"

type AreaBumpDimension = "x" | "y" | "groupBy"

const areaBumpDimension: Dimensions<AreaBumpDimension> = {
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

export const AreaBumpChart: Chart<
  Omit<AreaBumpSvgProps<any, Record<string, never>>, "width" | "height">,
  AreaBumpDimension
> = {
  Component: ResponsiveAreaBump,

  Config: AreaBumpConfig,

  dimensions: areaBumpDimension,

  transfomer: (data, dimensions) => data,

  defaultConfig: {},
}
