import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import type { VizsAction, VizsState } from "./types"
import { BarChartData, PieChartData, RadarChartData } from "./dummyData"

export const useVizsStore = create(
  immer<VizsState & VizsAction>((set, get) => ({
    layouts: [],
    visz: {
      radar: {
        name: "Radar Charts",
        type: "radar",
        dimension: [],
        source: "",
        config: {
          indexBy: "taste",
          keys: ["chardonay", "carmenere", "syrah"],
          margin: { top: 70, right: 80, bottom: 40, left: 80 },
          data: RadarChartData,
          width: 640,
          height: 640,
          blendMode: "multiply",
        },
      },
      "sample-charts": {
        name: "sample-charts",
        type: "bar",
        config: {
          data: BarChartData,
          indexBy: "country",
          keys: ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"],
          margin: { top: 20, right: 80, bottom: 80, left: 80 },
          labelTextColor: "#FFF",
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
        name: "pie-charts",
        type: "pie",
        dimension: {
          values: [],
          x: [],
        },
        source: "",
        config: {
          height: 540,
          width: 640,
          margin: { top: 0, right: 80, bottom: 0, left: 80 },
          innerRadius: 0.5,
          padAngle: 0.7,
          cornerRadius: 3,
          activeOuterRadiusOffset: 8,
          data: PieChartData,
        },
      },
    },
    updateConfig: (chartId, config) =>
      set((state) => {
        state.visz[chartId].config = {
          ...state.visz[chartId].config,
          ...(config as any),
        }
      }),
  }))
)
