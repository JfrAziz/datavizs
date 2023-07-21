import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import type { VizsAction, VizsState } from "./types"
import {
  AreaBumpChartData,
  BarChartData,
  BumpChartData,
  HeatMapData,
  LineChartData,
  PieChartData,
  RadarChartData,
  RadialBarData,
} from "./dummyData"

export const useVizsStore = create(
  immer<VizsState & VizsAction>((set, get) => ({
    layouts: [],
    visz: {
      radialBar: {
        name: "Radial Bar",
        source: "",
        dimension: {},
        type: "radialbar",
        config: {
          data: RadialBarData,
          margin: { top: 10, right: 10, bottom: 50, left: 50 },
        },
      },
      areaBump: {
        name: "Area Bump",
        source: "",
        dimension: {},
        type: "areabump",
        config: {
          data: AreaBumpChartData,
          margin: { top: 10, right: 10, bottom: 50, left: 50 },
        },
      },
      bump: {
        name: "Bump Chart",
        type: "bump",
        source: "",
        dimension: {},
        config: {
          data: BumpChartData,
          margin: { top: 10, right: 10, bottom: 50, left: 50 },
        },
      },
      heatmap: {
        name: "Heat Map",
        source: "",
        dimension: {},
        type: "heatmap",
        config: {
          data: HeatMapData,
          margin: { top: 10, right: 10, bottom: 50, left: 50 },
          colors: {
            scheme: "red_yellow_blue",
            type: "sequential",
          },
        },
      },
      line: {
        name: "Line Chart",
        type: "line",
        dimension: {},
        source: "",
        config: {
          pointSize: 10,
          pointLabelYOffset: -12,
          useMesh: true,
          margin: { top: 10, right: 10, bottom: 50, left: 50 },
          yScale: {
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          },
          data: LineChartData,
        },
      },
      radar: {
        name: "Radar Charts",
        type: "radar",
        dimension: [],
        source: "",
        config: {
          indexBy: "taste",
          keys: ["chardonay", "carmenere", "syrah"],
          data: RadarChartData,
          blendMode: "multiply",
        },
      },
      bar: {
        name: "Bar Charts",
        source: "",
        dimension: {
          values: ["burger"],
          x: ["country"],
        },
        type: "bar",
        config: {
          data: BarChartData,
          indexBy: "country",
          keys: ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"],
          margin: { top: 10, right: 10, bottom: 50, left: 50 },
          labelTextColor: "#FFF",
        },
      },
      pie: {
        name: "Pie Charts",
        type: "pie",
        dimension: {
          values: [],
          x: [],
        },
        source: "",
        config: {
          margin: { top: 10, right: 10, bottom: 50, left: 50 },
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
