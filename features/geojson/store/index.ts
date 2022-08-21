import create from "zustand";
import { Store } from "./types";
import { createDataSlice } from "./slices/dataSlice";
import { createLegendSlice } from "./slices/legendSlice";
import { createSettingsSlice } from "./slices/settingsSlice";

/**
 * global state management for maps page, it include any data 
 * required such as geojson data, settings, and legend
 */
export const useStore = create<Store>()((...a) => ({
  ...createDataSlice(...a),
  ...createLegendSlice(...a),
  ...createSettingsSlice(...a)
}))