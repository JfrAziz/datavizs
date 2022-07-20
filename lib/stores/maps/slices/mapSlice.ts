import  { StateCreator } from "zustand";
import { baseMaps } from "@config/baseMaps";
import { DataStore, MapState, MapStore } from "@stores/maps/types";

const initialValue: MapState = {
  showControl: true,

  baseMap: baseMaps[0],
}

export const createMapSlice: StateCreator<DataStore, [], [], MapStore> = (set) => ({
  ...initialValue,

  setBaseMap: (value) => set({ baseMap: value }),

  toggleControl: () => set((state) => ({ showControl: !state.showControl })),
})