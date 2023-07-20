export type * from "./types"

import { BarChart } from "./bar"
import { PieChart } from "./pie"
import { RadarChart } from "./radar"

export const charts = {
  bar: BarChart,
  pie: PieChart,
  radar:RadarChart
}

