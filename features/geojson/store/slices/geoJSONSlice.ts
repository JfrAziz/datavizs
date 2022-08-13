import { v4 } from "uuid";
import { omit } from "@lib/utils/omit";
import { StateCreator } from "zustand";
import { getFeatureColor } from "@geojson/utils/colors";
import { configureFCProperties, validateFC } from "@geojson/utils/featureCollection";
import { DataStore, GeoJSONState, GeoJSONStore, GeoJSONExtended } from "@geojson/store/types";

const geoJSONStateInitialValue: GeoJSONState = {
  geoJSONKey: null,

  geoJSONRef: null,

  features: [],

  propertiesKeys: [],

}

export const createGeoJSONSlice: StateCreator<DataStore, [], [], GeoJSONStore> = (set) => ({
  ...geoJSONStateInitialValue,

  importGeoJSON: (jsonString) => {
    const { json, propertiesKeys } = configureFCProperties(validateFC(JSON.parse(jsonString) as unknown as GeoJSONExtended))

    set(({ geoJSONKey: v4(), features: json.features, propertiesKeys: propertiesKeys, legends: [], legendTitle: "" }))
  },

  setGeoJSONRef: (ref) => set({ geoJSONRef: ref }),

  deleteFeaturebyUUIDs: (uuids) => set((state) => {
    const features = state.features.filter(item => !uuids.includes(item.properties.uuid))

    if (!features.length) return geoJSONStateInitialValue

    return { features: features }
  }),

  updateFeatureByUUID: (uuid, properties) => set((state) => ({
    features: state.features.map((item) => {
      if (item.properties.uuid !== uuid) return item
      return { ...item, properties: properties }
    })
  })),

  addPropertiesKey: (key) => set((state) => ({
    features: state.features.map((item) => ({ ...item, properties: { ...item.properties, [key]: "" } })),
    propertiesKeys: [...state.propertiesKeys, key]
  })),

  deletePropertiesKeys: (keys) => {
    keys = keys.filter(key => !['color', 'uuid'].includes(key))

    return set((state) => ({
      features: state.features.map((item) => ({ ...item, properties: omit(item.properties, keys) })),
      propertiesKeys: state.propertiesKeys.filter(keyName => !keys.includes(keyName))
    }))
  },

  updateFeatureColor: (key, legends) => set((state) => ({
    features: state.features.map((item) => ({ ...item, properties: { ...item.properties, color: getFeatureColor(item.properties[key], legends) } })),
  }))
})