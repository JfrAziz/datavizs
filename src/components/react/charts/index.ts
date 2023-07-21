export type * from "./types"

import { AreaBumpChart } from "./areabump"
import { BarChart } from "./bar"
import { BumpChart } from "./bump"
import { LineChart } from "./line"
import { PieChart } from "./pie"
import { RadarChart } from "./radar"

export const charts = {
  bar: BarChart,
  pie: PieChart,
  radar: RadarChart,
  line: LineChart,
  bump: BumpChart,
  areabump: AreaBumpChart,
}
