import create from "zustand";
import { Store } from "./types";
import { persist } from 'zustand/middleware'
import { createDataSlice } from "./slices/dataSlice";
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
  getStorage: () => localStorage,
  partialize: (state) => ({
    features: state.features,
    geoJSONKey: state.geoJSONKey,
    propertiesKeys: state.propertiesKeys,
  })
}))