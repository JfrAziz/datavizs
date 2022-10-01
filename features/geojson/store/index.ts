import create from "zustand";
import { Store } from "./types";
import { get, set, del } from 'idb-keyval';
import { createDataSlice } from "./slices/dataSlice";
import { persist, StateStorage } from 'zustand/middleware'
import { createSettingsSlice } from "./slices/settingsSlice";
import { createMapInformationSlice } from "./slices/mapInformationSlice";

/**
 * global state management for maps page, it include any data 
 * required such as geojson data, settings, and legend
 */

export const useStore = create<Store>()(persist((...a) => ({
  ...createDataSlice(...a),
  ...createSettingsSlice(...a),
  ...createMapInformationSlice(...a),
}), {
  name: 'store',
  partialize: (state) => ({
    features: state.features,

    geoJSONKey: state.geoJSONKey,

    propertiesKeys: state.propertiesKeys,

    legends: state.legends,

    legendSettings: state.legendSettings,

    proportionalCircle: state.proportionalCircle,

    labelSettings: state.labelSettings,

    baseMap: state.baseMap,

    geoJSONSettings: state.geoJSONSettings
  }),
  getStorage: (): StateStorage => ({
    getItem: async (name: string): Promise<string | null> => {
      return (await get(name)) || null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
      await set(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
      await del(name);
    },
  })
}))