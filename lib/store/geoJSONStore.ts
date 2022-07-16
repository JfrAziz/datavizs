import { v4 } from 'uuid';
import create from 'zustand'
import { FeatureCollection } from "geojson";
import { validateFC, configureFCProperties } from '@utils/featureCollection';

interface GeoJSONState {
  mapKey: string | null;
  geoJSON: FeatureCollection | null;
  importGeoJSON: (jsonString: string) => void;
  updateFeatureByUUID: (uuid: string, properties: any) => void;
  deleteFeaturebyUUID: (uuid: string) => void;
  updateFeatureColor: (uuid: string, color: string) => void;
  anotherFunction: (uuid: string, color: string) => void;
}

let updated = 0;
let updated2 = 0;

export const useGeoJSONStore = create<GeoJSONState>()((set, get) => ({
  mapKey: null,
  geoJSON: null,
  importGeoJSON: (jsonString: string) => {
    let json = validateFC(JSON.parse(jsonString) as unknown as FeatureCollection)

    set(state => ({ mapKey: v4(), geoJSON: configureFCProperties(json) }))
  },
  deleteFeaturebyUUID: (uuid: string) => {
    const geoJSON = get().geoJSON

    geoJSON && set((state) => {

      if (geoJSON?.features.length === 1) return { mapKey: null, geoJSON: null }

      return ({ geoJSON: { ...geoJSON, features: geoJSON.features.filter((item) => item?.properties?.uuid !== uuid) } })
    })
  },
  updateFeatureByUUID: (uuid: string, properties: any) => {
    // console.log(uuid)

    console.log("update", updated2)
    updated2++
    let geoJSON = get().geoJSON
    if (geoJSON) {
      geoJSON = {
        ...geoJSON, features: geoJSON.features.map((item) => {
          if (item?.properties?.uuid !== uuid) return item
          return { ...item, properties: properties }
        })
      }
      set({ geoJSON: geoJSON })
    }
  },
  updateFeatureColor: (uuid: string, color: string) => {
    // console.log("color", uuid)
    console.log("color", updated)
    updated++
  },
  anotherFunction: (uuid: string, color: string) => {
    // console.log("color", uuid)
    console.log("color", updated)
    updated++
  }
}))