import { v4 } from "uuid";
import { scale } from "chroma-js";
import { StateCreator } from "zustand";
import { randomColor } from "@utils/colors";
import { DataStore, Legend, LegendOptions, LegendStore } from "@stores/maps/types";


/**
 * create a single type value legend 
 * @returns Legend
 */
const createLegend = (): Legend => ({
  uuid: v4(),
  label: "",
  value: "",
  hidden: false,
  type: "single",
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

export const createLegendSlice: StateCreator<DataStore, [], [], LegendStore> = (set) => ({
  legends: [],

  legendOptions: LegendOptionsInitialValue,

  addLegends: () => set(state => ({
    legends: [...state.legends, createLegend()]
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
  })
})