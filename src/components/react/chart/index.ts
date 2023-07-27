export type * from "./types"

import { PieChart } from "./pie"
import { BarChart } from "./bar"
import { BumpChart } from "./bump"
import { LineChart } from "./line"
import { RadarChart } from "./radar"
import { HeatMapChart } from "./heatmap"
import { AreaBumpChart } from "./areabump"
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
