import { v4 } from "uuid";
import { scale } from "chroma-js";
import { StateCreator } from "zustand";
import { randomColor } from "@utils/colors";
import { DataStore, LegendOptions, LegendStore } from "@stores/maps/types";

const LegendInitialValue : LegendOptions = {
  show: false,

  position: {
    x: 10,

    y: 10
  },

  width: undefined,

  spacing: 0,

  direction: "column",

  backgroundColor: "#FFF",

  textColor: "#666",

  textSize: 12,

  symbolSize: 25
}

export const createLegendSlice: StateCreator<DataStore, [], [], LegendStore> = (set) => ({
  legends: [],

  legendOptions: LegendInitialValue,

  addLegends: () => set(state => ({
    legends: [...state.legends, {
      uuid: v4(),
      label: "",
      value: "",
      hidden: false,
      type: "single",
      color: randomColor(),
    }]
  })),

  updateLegend: (uuid, legend) => set(state => ({
    legends: state.legends.map((item, id) => item.uuid !== uuid ? item : legend)
  })),

  deleteLegend: (uuid) => {
    return set(state => ({
      legends: state.legends.filter((item, id) => item.uuid !== uuid)
    }))
  },

  resetLegends: () => set({ legends: [] }),

  generateGradient: () => set(state => {
    const length = state.legends.length;

    if (length <= 2) return {}

    const gradientArray = scale([state.legends[0].color, state.legends[length - 1].color]).mode('lch').colors(length)

    return { legends: state.legends.map((legend, index) => ({ ...legend, color: gradientArray[index] })) }
  })
})