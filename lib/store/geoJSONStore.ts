import { v4 } from 'uuid';
import create from 'zustand'
import { FeatureCollection } from "geojson";

interface GeoJSONState {
  mapKey: string | null;
  geoJSON: FeatureCollection | null;
  importGeoJSON: (value: string) => void;
  deleteGeoJSONFirtsIndex: () => void;
}

export const useGeoJSONStore = create<GeoJSONState>()((set, get) => ({
  mapKey: null,
  geoJSON: null,
  importGeoJSON: (value: string) => {
    const json = JSON.parse(value) as unknown as FeatureCollection

    if (!(json?.type === 'FeatureCollection')) throw new Error("GeoJSON Not Valid");

    if (!(json?.features)) throw new Error("GeoJSON has emtpy value");

    // add a uuid foreach features properties
    json.features.forEach((item, idx) => {
      if (!json.features[idx].properties) {
        Object.assign(json.features[idx], { properties: {} })
      }

      if (!json.features[idx].properties?.uuid) {
        Object.assign(json.features[idx].properties as {}, { uuid: v4() })
      }
    });

    set(state => ({ mapKey: v4(), geoJSON: json }))
  },
  deleteGeoJSONFirtsIndex: () => {
    const geoJSON = get().geoJSON
    if (geoJSON) {
      set((state) => ({ geoJSON: { type: "FeatureCollection", features: geoJSON.features.filter((item, id) => id !== 1) } }))
    }
  }
}))