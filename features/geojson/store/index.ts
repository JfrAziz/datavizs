import create from "zustand";
import { Store } from "./types";
import { createDataSlice } from "./slices/dataSlice";
import { createSettingsSlice } from "./slices/settingsSlice";
import { createMapInformationSlice } from "./slices/mapInformationSlice";

/**
 * global state management for maps page, it include any data 
 * required such as geojson data, settings, and legend
 */
export const useStore = create<Store>()((...a) => ({
  ...createDataSlice(...a),
  ...createSettingsSlice(...a),
  ...createMapInformationSlice(...a),
}))