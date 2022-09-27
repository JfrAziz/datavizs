import { createRef } from "react";
import { StateCreator } from "zustand";
import { baseMaps } from "@config/leaflet";
import { toPng, toSvg, toJpeg } from 'html-to-image';
import { Store, SettingsState, SettingsStore } from "@geojson/store/types";

const initialValue: SettingsState = {
  mapRef: null,

  geoJSONRef: null,

  mapWrapperRef: createRef<HTMLDivElement>(),

  mapWrapper: {
    type: "auto"
  },

  baseMap: baseMaps[0],

  geoJSONSettings: {
    borderColor: "#FFF",

    borderWidth: 1,

    opacity: 1
  },
}

export const createSettingsSlice: StateCreator<Store, [], [], SettingsStore> = (set, get) => ({
  ...initialValue,

  setMapRef: (map) => set({ mapRef: map }),

  setGeoJSONRef: (ref) => set({ geoJSONRef: ref }),

  setBaseMap: (value) => set({ baseMap: value }),

  setMapWrapper: (map) => {
    set(state => ({ mapWrapper: { ...state.mapWrapper, ...map } }))

    setTimeout(() => { get().mapRef?.invalidateSize() }, 400);
  },

  setMapToCenter: () => {
    const geoJSONref = get().geoJSONRef

    if (!geoJSONref || Object.keys(geoJSONref.getBounds()).length === 0) return get().mapRef?.setView([0, 0]);

    return get().mapRef?.fitBounds(geoJSONref.getBounds())
  },

  downloadMap: async (format) => {
    const mapWrapperRef = get().mapWrapperRef

    if (!mapWrapperRef || !mapWrapperRef.current) return;

    let dataUrl: string;

    switch (format) {
      case "jpeg":
        dataUrl = await toJpeg(mapWrapperRef.current)
        break;
      case "svg":
        dataUrl = await toSvg(mapWrapperRef.current)
        break;
      default:
        dataUrl = await toPng(mapWrapperRef.current)
        break;
    }

    const donwloadButton = document.createElement('a');
    donwloadButton.download = "export"
    donwloadButton.href = dataUrl
    donwloadButton.click()
  },

  updateGeoJSONSettings: (settings) => set(state => ({ geoJSONSettings: { ...state.geoJSONSettings, ...settings } }))
})