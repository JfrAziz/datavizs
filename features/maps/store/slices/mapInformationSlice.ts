import { v4 } from "uuid";
import chroma from "chroma-js";
import { StateCreator } from "zustand";
import { quantile } from "@lib/misc/stats";
import { randomColor } from "@lib/misc/colors";
import { DEFAULT_CIRCLE_BORDER_COLOR, DEFAULT_CIRCLE_FILL_COLOR } from "@config/leaflet";
import {
  Store,
  Legend,
  LegendSettings,
  MapInformationStore,
  LabelSettings,
  ProportionalCircle
} from "features/maps/store/types";


/**
 * create a single type value legend 
 * @returns Legend
 */
const createSingleLegend = (value: string = ""): Legend => ({
  uuid: v4(),
  label: value,
  value: value,
  hidden: false,
  type: "single",
  color: randomColor(),
})

/**
 * create a single type value legend 
 * @returns Legend
 */
const createRangeLegend = (min: number, max: number): Legend => ({
  label: "",
  uuid: v4(),
  type: "range",
  hidden: false,
  value: {
    min: min,
    max: max
  },
  color: randomColor(),
})


/**
 * initial value for legend
 */
export const legendSettingsInitialValue: LegendSettings = {
  show: false,

  key: "",

  title: "",

  position: {
    x: 0,

    y: 0
  },

  size: {
    width: "auto",

    height: "auto"
  },

  spacing: 0,

  direction: "column",

  backgroundColor: "#FFFFFF",

  fontColor: "#666666",

  fontSize: 12,

  symbolSize: 25
}

export const labelSettingsInitialValue: LabelSettings = {
  show: false,

  color: "#3A3A3A",

  key: "",

  size: 12
}

export const proportionalCircleInitialValue: ProportionalCircle = {
  min: 1000,

  max: 10000,

  show: false,

  color: DEFAULT_CIRCLE_FILL_COLOR,

  borderColor: DEFAULT_CIRCLE_BORDER_COLOR
}

export const createMapInformationSlice: StateCreator<Store, [["zustand/persist", unknown]], [], MapInformationStore> = (set, get) => ({
  legends: [],

  legendSettings: legendSettingsInitialValue,

  proportionalCircle: proportionalCircleInitialValue,

  labelSettings: labelSettingsInitialValue,

  addLegends: () => set(state => ({
    legends: [...state.legends, createSingleLegend()]
  })),

  updateLegend: (uuid, legend) => set(state => ({
    legends: state.legends.map((item, id) => item.uuid !== uuid ? item : legend)
  })),

  deleteLegend: (uuid) => set(state => ({
    legends: state.legends.filter((item, id) => item.uuid !== uuid)
  })),

  resetLegends: () => set({ legends: [] }),

  moveLegend: (from, to) => {
    const legends = [...get().legends]

    if (from === to) return;

    if (from < 0 || to < 0) return;

    if (from > legends.length - 1 || to > legends.length - 1) return;

    // swap array
    [legends[from], legends[to]] = [legends[to], legends[from]]

    return set({ legends: legends })
  },

  sortLegend: (by, order) => {
    const legends = [...get().legends]

    legends.sort((a, b) => {
      if (by === "label") return a.label > b.label ? 1 : -1

      const valueA = a.type === "range" ? a.value.min : a.value
      const valueB = b.type === "range" ? b.value.min : b.value

      return (valueA ?? 0) > (valueB ?? 0) ? 1 : -1
    })

    if (order === "desc") legends.reverse()

    return set({ legends: legends })
  },

  resetLegendSettings: () => set({
    legendSettings: { ...legendSettingsInitialValue, show: true }
  }),

  updateLegendSettings: (legend) => set(state => ({
    legendSettings: { ...state.legendSettings, ...legend }
  })),

  generateGradient: () => set(state => {
    const length = state.legends.length;

    if (length <= 2) return {}

    const gradientArray = chroma.scale([state.legends[0].color, state.legends[length - 1].color]).mode('lch').colors(length).map(color => chroma(color).css())

    return { legends: state.legends.map((legend, index) => ({ ...legend, color: gradientArray[index] })) }
  }),

  generateUniqueLegends: (key) => {
    const data = get().features.map(item => item.properties[key])

    const uniqueValue = [...new Set(data)]

    set({ legends: uniqueValue.map(item => createSingleLegend(item)) })
  },

  generateQuantileLegends: (key, quantileValue) => {
    const data = get().features
      .map(item => Number(item.properties[key]))
      .filter(item => item)
      .sort((a, b) => a - b)

    const quantileResults = quantile(data, quantileValue) as number[]

    const result: Legend[] = []

    for (let index = 0; index < quantileResults.length - 1; index++) {
      const min = quantileResults[index];
      const max = quantileResults[index + 1]

      result.push(createRangeLegend(min, max))
    }

    set({ legends: result })
  },

  updateProportionalCircle: (settings) => set(state => ({ proportionalCircle: { ...state.proportionalCircle, ...settings } })),

  updateLabelSettings: (settings) => set(state => ({ labelSettings: { ...state.labelSettings, ...settings } }))
})