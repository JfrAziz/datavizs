import { RadarConfig } from "./radar-config"
import type { Chart, Dimensions } from "../types"
import { Radar, RadarSvgProps, ResponsiveRadar } from "@nivo/radar"

type RadarDimensions = "dimension" | "items"

const radarDimensions: Dimensions<RadarDimensions> = {
  dimension: {
    max: 1,
    required: true,
    label: "Dimension",
    accept: ["number", "string"],
  },
  items: {
    required: true,
    label: "Items",
    accept: ["number", "string"],
  },
}

export const RadarChart: Chart<
  Omit<RadarSvgProps<Record<string, any>>, "height" | "width">,
  RadarDimensions
> = {
  Component: ResponsiveRadar,

  Config: RadarConfig,

  dimensions: radarDimensions,

  transfomer: (data, dimensions) => data,

  defaultConfig: {
    blendMode: "multiply",
    borderWidth: 2,
    gridLevels: 5,
    gridShape: "linear",
  },
}
