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

  setGeoJSONRef: (ref) => set({ geoJSONRef: ref }),

  importGeoJSON: (jsonString) => {
    const { json, propertiesKeys } = configureFCProperties(validateFC(JSON.parse(jsonString) as unknown as GeoJSONExtended))

    set(({
      legends: [],
      legendTitle: "",
      geoJSONKey: v4(),
      features: json.features,
      propertiesKeys: propertiesKeys,
    }))
  },

  deleteFeaturebyUUIDs: (uuids) => set((state) => {
    const features = state.features.filter(item => !uuids.includes(item.uuid))

    if (!features.length) return geoJSONStateInitialValue

    return { features: features }
  }),

  updateFeatureProperties: (uuid, properties) => set((state) => ({
    features: state.features.map((item) => item.uuid !== uuid ? item : { ...item, properties: properties })
  })),

  addPropertiesKey: (key) => set((state) => ({
    features: state.features.map((item) => ({ ...item, properties: { ...item.properties, [key]: "" } })),
    propertiesKeys: [...state.propertiesKeys, key]
  })),

  deletePropertiesKeys: (keys) => {
    keys = keys.filter(key => !['color'].includes(key))

    return set((state) => ({
      features: state.features.map((item) => ({ ...item, properties: omit(item.properties, keys) })),
      propertiesKeys: state.propertiesKeys.filter(keyName => !keys.includes(keyName))
    }))
  },

  syncFeatureWithLegend: (key, legends) => set((state) => ({
    features: state.features.map((item) => ({
      ...item,
      properties: { ...item.properties, color: getFeatureColor(item.properties[key], legends) }
    })),
  })),

  updatePointCoordinate: (uuid, lat, lng) => set(state => ({
    features: state.features.map(item => item.uuid !== uuid ? item : { ...item, point: { ...item.point, lat: lat, lng: lng } })
  }))
})