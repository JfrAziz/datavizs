export type * from "./types"

import { AreaBumpChart } from "./areabump"
import { BarChart } from "./bar"
import { BumpChart } from "./bump"
import { HeatMapChart } from "./heatmap"
import { LineChart } from "./line"
import { PieChart } from "./pie"
import { RadarChart } from "./radar"
import { RadialBarChart } from "./radialbar"

export const charts = {
  bar: BarChart,
  pie: PieChart,
  radar: RadarChart,
  line: LineChart,
  bump: BumpChart,
  areabump: AreaBumpChart,
  radialbar: RadialBarChart,
  heatmap: HeatMapChart,
}
