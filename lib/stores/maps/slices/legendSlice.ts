import { scale } from "chroma-js";
import { StateCreator } from "zustand";
import { randomColor } from "@utils/colors";
import { DataStore, LegendStore } from "@stores/maps/types";


export const createLegendSlice: StateCreator<DataStore, [], [], LegendStore> = (set) => ({
  legends: [],

  addLegends: () => set(state => ({
    legends: [...state.legends, { color: randomColor(), value: "", hidden: false }]
  })),

  updateLegendValue: (idx, value) => set(state => ({
    legends: state.legends.map((item, id) => id !== idx ? item : { ...item, value: value })
  })),

  updateLegendColor: (idx, color) => set(state => ({
    legends: state.legends.map((item, id) => id !== idx ? item : { ...item, color: color })
  })),

  toggleHiddenLegend: (idx) => set(state => ({
    legends: state.legends.map((item, id) => id !== idx ? item : { ...item, hidden: !item.hidden })
  })),

  deleteLegend: (idx) => set(state => ({
    legends: state.legends.filter((item, id) => id !== idx)
  })),

  resetLegends: () => set({ legends: [] }),

  generateGradient: () => set(state => {
    const length = state.legends.length;

    if (length <= 2) return {}

    const gradientArray = scale([state.legends[0].color, state.legends[length - 1].color]).mode('lch').colors(length)

    return { legends: state.legends.map((color, index) => ({...color, color: gradientArray[index]}) ) }
  })
})