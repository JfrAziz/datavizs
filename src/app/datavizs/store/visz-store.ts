import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import type { VizsAction, VizsState } from "./types"
import { BarChartData, PieChartData } from "./dummyData"

export const useVizsStore = create(
  immer<VizsState & VizsAction>((set, get) => ({
    layouts: [],
    visz: {
      "sample-charts": {
        type: "bar",
        config: {
          data: BarChartData,
          indexBy: "country",
          keys: ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"],
          margin: { top: 40, right: 80, bottom: 80, left: 80 },
          padding: 0.3,
          width: 640,
          height: 640,
        },
        source: "",
        dimension: {
          values: ["burger"],
          x: ["country"],
        },
      },
      pie_chart: {
        type: "pie",
        dimension: {
          values: [],
          x: [],
        },
        source: "",
        config: {
          height: 640,
          width: 640,
          margin: { top: 40, right: 80, bottom: 80, left: 80 },
          innerRadius: 0.5,
          padAngle: 0.7,
          cornerRadius: 3,
          activeOuterRadiusOffset: 8,
          data: PieChartData,
        },
      },
    },
  }))
)
