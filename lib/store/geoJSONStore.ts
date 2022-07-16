import { v4 } from 'uuid';
import create from 'zustand'
import { validateFC, configureFCProperties, GeoJSONExtended, FeatureProperties } from '@utils/featureCollection';

interface GeoJSONState extends Omit<GeoJSONExtended, "type"> {

  mapKey: string | null;

  features: GeoJSONExtended["features"] | [];

  importGeoJSON: (jsonString: string) => void;

  updateFeatureByUUID: (uuid: string, properties: FeatureProperties) => void;

  deleteFeaturebyUUID: (uuid: string) => void;

  deleteFeaturebyUUIDs: (uuids: string[]) => void;
}

export const useGeoJSONStore = create<GeoJSONState>()((set, get) => ({
  mapKey: null,

  features: [],

  importGeoJSON: (jsonString: string) => {
    let json = validateFC(JSON.parse(jsonString) as unknown as GeoJSONExtended)

    set(({ mapKey: v4(), features: configureFCProperties(json).features }))
  },

  deleteFeaturebyUUID: (uuid: string) => set((state) => {
    if (state.features.length === 1) return { mapKey: null, features: [] }

    return { features: state.features.filter(item => item.properties.uuid !== uuid) }
  }),

  deleteFeaturebyUUIDs: (uuids: string[]) => set((state) => {
    const features = state.features.filter(item => !uuids.includes(item.properties.uuid))

    if (!features.length) return { mapKey: null, features: [] }

    return { features: features }
  }),

  updateFeatureByUUID: (uuid: string, properties: FeatureProperties) => set((state) => ({
    features: state.features.map((item) => {
      if (item.properties.uuid !== uuid) return item
      return { ...item, properties: properties }
    })
  })),
}))