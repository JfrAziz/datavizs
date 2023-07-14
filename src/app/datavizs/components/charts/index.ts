export type * from "./types"

import { BarChart } from "./bar"
import { PieChart } from "./pie"

export const charts = {
  bar: BarChart,
//^?
  pie: PieChart,
}

