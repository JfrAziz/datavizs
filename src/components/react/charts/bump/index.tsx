import type { Chart, Dimensions } from "../types"
import { ResponsiveBump, type BumpSvgProps } from "@nivo/bump"
import { BumpConfig } from "./bump-config"

type BumpDimension = "x" | "y" | "groupBy"

const bumpDimension: Dimensions<BumpDimension> = {
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

export const BumpChart: Chart<
  Omit<BumpSvgProps<any, Record<string, never>>, "width" | "height">,
  BumpDimension
> = {
  Component: ResponsiveBump,

  Config: BumpConfig,

  dimensions: bumpDimension,

  transfomer: (data, dimensions) => data,

  defaultConfig: {},
}
