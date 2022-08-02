import { createRef } from "react";
import { StateCreator } from "zustand";
import { baseMaps } from "@config/maps";
import { toPng, toSvg, toJpeg } from 'html-to-image';
import { DataStore, MapState, MapStore } from "@stores/maps/types";

const initialValue: MapState = {
  mapRef: null,

  mapWrapperRef: createRef<HTMLDivElement>(),

  mapWrapper: {
    type: "auto"
  },

  baseMap: baseMaps[0],

  showMapControls: true,
}

export const createMapSlice: StateCreator<DataStore, [], [], MapStore> = (set, get) => ({
  ...initialValue,

  setMapRef: (map) => set({ mapRef: map }),

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

  toggleMapControls: () => set((state) => ({ showMapControls: !state.showMapControls })),
})