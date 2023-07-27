import { ResponsiveBar } from "@nivo/bar"
import { ResponsivePie } from "@nivo/pie"
import { ResponsiveLine } from "@nivo/line"
import { ResponsiveRadar } from "@nivo/radar"
import { ResponsiveHeatMap } from "@nivo/heatmap"
import { ResponsiveRadialBar } from "@nivo/radial-bar"
import { ResponsiveBump, ResponsiveAreaBump } from "@nivo/bump"

export type { BarSvgProps } from "@nivo/bar"
export type { PieSvgProps } from "@nivo/pie"
export type { LineSvgProps } from "@nivo/line"
export type { RadarSvgProps } from "@nivo/radar"
export type { HeatMapSvgProps } from "@nivo/heatmap"
export type { RadialBarSvgProps } from "@nivo/radial-bar"
export type { BumpSvgProps, AreaBumpSvgProps } from "@nivo/bump"

export { ResponsiveBar }
export { ResponsivePie }
export { ResponsiveLine }
export { ResponsiveRadar }
export { ResponsiveHeatMap }
export { ResponsiveRadialBar }
export { ResponsiveBump, ResponsiveAreaBump }

export const charts = {
  bar: ResponsiveBar,
  pie: ResponsivePie,
  radar: ResponsiveRadar,
  line: ResponsiveLine,
  bump: ResponsiveBump,
  areabump: ResponsiveAreaBump,
  radialbar: ResponsiveRadialBar,
  heatmap: ResponsiveHeatMap,
}
