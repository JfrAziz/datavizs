import create from 'zustand'
import { BaseMap, baseMaps } from "@config/baseMaps";

interface MapSettingsState {
  showControl: boolean;

  baseMap: BaseMap | null;
  
  setBaseMap: (value: BaseMap | null) => void

  toggleControl: () => void;
}

export const useMapStore = create<MapSettingsState>()((set, get) => ({
  showControl: true,

  baseMap: baseMaps[0],

  setBaseMap: (value) => set((state) => ({ baseMap: value })),

  toggleControl: () => set((state) => ({ showControl: !get().showControl })),
}))