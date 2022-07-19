import create from 'zustand'
import Gradient from "javascript-color-gradient";
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
    legends: [...state.legends, { color: randomColor(), value: 0, hidden: false }]
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

    const gradientArray = new Gradient().setColorGradient(state.legends[0].color, state.legends[length - 1].color).setMidpoint(length).getColors()

    return { legends: state.legends.map((color, index) => ({...color, color: gradientArray[index]}) ) }
  })
}))