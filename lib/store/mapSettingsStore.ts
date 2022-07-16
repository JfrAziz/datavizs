import create from 'zustand'
import { BaseMap, baseMaps } from "@config/baseMaps";

interface MapSettingsContextValue {
  showControl: boolean;

  baseMap: BaseMap | null;
  
  setBaseMap: (value: BaseMap | null) => void

  toggleControl: () => void;
}

export const useMapSettingsStore = create<MapSettingsContextValue>()((set, get) => ({
  showControl: true,

  baseMap: baseMaps[0],

  setBaseMap: (value) => set((state) => ({ baseMap: value })),

  toggleControl: () => set((state) => ({ showControl: !get().showControl })),
}))