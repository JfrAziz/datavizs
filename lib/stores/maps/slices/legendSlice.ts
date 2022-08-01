import { v4 } from "uuid";
import { scale } from "chroma-js";
import { StateCreator } from "zustand";
import { randomColor } from "@utils/colors";
import { DataStore, Legend, LegendOptions, LegendStore } from "@stores/maps/types";
import { quantile } from "../utils/stats";


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
 * initial value for legend options
 */
const LegendOptionsInitialValue: LegendOptions = {
  show: false,

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

export const createLegendSlice: StateCreator<DataStore, [], [], LegendStore> = (set, get) => ({
  legends: [],

  legendOptions: LegendOptionsInitialValue,

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

  resetLegendOptions: () => set({
    legendOptions: { ...LegendOptionsInitialValue, show: true }
  }),

  updateLegendOptions: (legend) => set(state => ({
    legendOptions: { ...state.legendOptions, ...legend }
  })),

  generateGradient: () => set(state => {
    const length = state.legends.length;

    if (length <= 2) return {}

    const gradientArray = scale([state.legends[0].color, state.legends[length - 1].color]).mode('lch').colors(length)

    return { legends: state.legends.map((legend, index) => ({ ...legend, color: gradientArray[index] })) }
  }),

  generateUniqueLegends: (key) => {
    const data = get().features.map(item => item.properties[key])

    const uniqueValue = [...new Set(data)]

    set({ legends: uniqueValue.map(item => createSingleLegend(item)) })
  },

  generateQuantileLegends: (key, quantileValue) => {
    const data = get().features
      .map(item => item.properties[key])
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
  }
})