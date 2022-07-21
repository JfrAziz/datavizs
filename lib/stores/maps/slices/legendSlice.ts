import { v4 } from "uuid";
import { scale } from "chroma-js";
import { StateCreator } from "zustand";
import { randomColor } from "@utils/colors";
import { DataStore, LegendStore } from "@stores/maps/types";


export const createLegendSlice: StateCreator<DataStore, [], [], LegendStore> = (set) => ({
  legends: [],

  addLegends: () => set(state => ({
    legends: [...state.legends, {
      uuid: v4(),
      label: "",
      color: randomColor(),
      hidden: false,
      type: "equals",
      value: [""],
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