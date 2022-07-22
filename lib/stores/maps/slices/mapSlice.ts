import  { StateCreator } from "zustand";
import { baseMaps } from "@config/maps";
import { DataStore, MapState, MapStore } from "@stores/maps/types";

const initialValue: MapState = {
  map: null,

  showControl: true,

  baseMap: baseMaps[0],

  mapWrapper: {
    type: "auto"
  }
}

export const createMapSlice: StateCreator<DataStore, [], [], MapStore> = (set, get) => ({
  ...initialValue,

  setMap: (map) => set({ map: map }),

  setBaseMap: (value) => set({ baseMap: value }),

  setMapWrapper: (map) => set(state => {

    state.map?.invalidateSize()

    return { mapWrapper: map }
  }),

  toggleControl: () => set((state) => ({ showControl: !state.showControl })),

  setMapToCenter: () => {
    const geoJSONref = get().geoJSONRef
    
    if (!geoJSONref ||  Object.keys(geoJSONref.getBounds()).length === 0) return;

    return get().map?.fitBounds(geoJSONref.getBounds())
  }
})