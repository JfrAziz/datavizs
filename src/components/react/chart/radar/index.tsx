import { dataFilter } from "@/utils/column"
import { RadarConfig } from "./radar-config"
import type { Chart, Dimensions } from "../types"
import {
  RadarSvgProps,
  ResponsiveRadar,
} from "@/components/react/chart-provider"

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

  defaultConfig: {
    blendMode: "multiply",
    borderWidth: 2,
    gridLevels: 5,
    gridShape: "linear",
  },

  createDataConfig: (dataSource, dimensions) => ({
    indexBy: dimensions.dimension?.[0],
    keys: dimensions.items ?? [],
    data: dataFilter(dataSource, [
      ...dimensions.dimension,
      ...dimensions.items,
    ]),
  }),

  createThemeConfig: () => ({}),
}
