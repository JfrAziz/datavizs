import create from 'zustand'
import { scale } from "chroma-js";
import { FeatureColor, randomColor } from '@utils/featureColor';

interface ColorStore {
  legends: FeatureColor[];

  addLegends: () => void;

  updateValue: (idx: number, value: string) => void;

  updateColor: (idx: number, color: string) => void;

  toggleHidden: (idx: number) => void;

  deleteLegend: (idx: number) => void;

  resetLegends: () => void;

  generateGradient: () => void
}

export const useLegendStore = create<ColorStore>()((set, get) => ({
  legends: [],

  addLegends: () => set(state => ({
    legends: [...state.legends, { color: randomColor(), value: "", hidden: false }]
  })),

  updateValue: (idx, value) => set(state => ({
    legends: state.legends.map((item, id) => id !== idx ? item : { ...item, value: value })
  })),

  updateColor: (idx, color) => set(state => ({
    legends: state.legends.map((item, id) => id !== idx ? item : { ...item, color: color })
  })),

  toggleHidden: (idx) => set(state => ({
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
}))