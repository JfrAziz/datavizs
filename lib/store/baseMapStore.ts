import create from 'zustand'
import { BaseMap, baseMaps } from "@config/baseMaps";

interface BaseMapState {
  baseMap: BaseMap | null;
  setBaseMap: (value: BaseMap | null) => void
}

export const useBaseMapStore = create<BaseMapState>()((set, get) => ({
  baseMap: baseMaps[0],
  setBaseMap: (value) => set((state) => ({ baseMap: value }))
}))