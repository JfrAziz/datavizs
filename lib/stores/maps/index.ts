import create from "zustand";
import { DataStore } from "./types";
import { createMapSlice } from "./slices/mapSlice";
import { createLegendSlice } from "./slices/legendSlice";
import { createGeoJSONSlice } from "./slices/geoJSONSlice";

/**
 * global state management for maps page, it include any data 
 * required such as geojson data, settings, and legend
 */
export const useStore = create<DataStore>()((...a) => ({
  ...createGeoJSONSlice(...a),
  ...createLegendSlice(...a),
  ...createMapSlice(...a)
}))