import { v4 } from "uuid";
import { omit } from "@utils/omit";
import { StateCreator } from "zustand";
import { getFeatureColor } from "@stores/maps/utils/colors";
import { configureFCProperties, validateFC } from "@stores/maps/utils/featureCollection";
import { DataStore, GeoJSONState, GeoJSONStore, GeoJSONExtended } from "@stores/maps/types";

const geoJSONStateInitialValue: GeoJSONState = {
  mapKey: null,

  features: [],

  propertiesKeys: [],

}

export const createGeoJSONSlice: StateCreator<DataStore, [], [], GeoJSONStore> = (set) => ({
  ...geoJSONStateInitialValue,

  importGeoJSON: (jsonString) => {
    const { json, propertiesKeys } = configureFCProperties(validateFC(JSON.parse(jsonString) as unknown as GeoJSONExtended))

    set(({ mapKey: v4(), features: json.features, propertiesKeys: propertiesKeys, legends: [] }))
  },

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

  deletePropertiesKey: (key) => {
    if (['color', 'uuid'].includes(key)) return; // don't delete uuid and color properties
    return set((state) => ({
      features: state.features.map((item) => ({ ...item, properties: omit(item.properties, key) })),
      propertiesKeys: state.propertiesKeys.filter(keyName => keyName !== key)
    }))
  },

  updateFeatureColor: (key, legends, operator) => set((state) => ({
    features: state.features.map((item) => ({ ...item, properties: { ...item.properties, color: getFeatureColor(item.properties[key], legends, operator) } })),
  }))
})