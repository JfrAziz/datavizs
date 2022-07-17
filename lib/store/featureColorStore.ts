import Gradient from "javascript-color-gradient";
import { FeatureColor, randomColor } from '@utils/featureColor';
import create from 'zustand'

interface ColorStore {
  colors: FeatureColor[];

  addColor: () => void;

  updateValue: (idx: number, value: string) => void;

  updateColor: (idx: number, color: string) => void;

  toggleHidden: (idx: number) => void;

  deleteColor: (idx: number) => void;

  resetColors: () => void;

  generateGradient: () => void
}

export const useFeatureColorStore = create<ColorStore>()((set, get) => ({
  colors: [],

  addColor: () => set(state => ({
    colors: [...state.colors, { color: randomColor(), value: 0, hidden: false }]
  })),

  updateValue: (idx, value) => set(state => ({
    colors: state.colors.map((item, id) => id !== idx ? item : { ...item, value: value })
  })),

  updateColor: (idx, color) => set(state => ({
    colors: state.colors.map((item, id) => id !== idx ? item : { ...item, color: color })
  })),

  toggleHidden: (idx) => set(state => ({
    colors: state.colors.map((item, id) => id !== idx ? item : { ...item, hidden: !item.hidden })
  })),

  deleteColor: (idx) => set(state => ({
    colors: state.colors.filter((item, id) => id !== idx)
  })),

  resetColors: () => set({ colors: [] }),

  generateGradient: () => set(state => {
    const length = state.colors.length;

    if (length <= 2) return {}

    const gradientArray = new Gradient().setColorGradient(state.colors[0].color, state.colors[length - 1].color).setMidpoint(length).getColors()

    return { colors: state.colors.map((color, index) => ({...color, color: gradientArray[index]}) ) }
  })
}))