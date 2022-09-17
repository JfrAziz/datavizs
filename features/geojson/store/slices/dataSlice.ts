import { v4 } from "uuid";
import { omit } from "@lib/utils/omit";
import { StateCreator } from "zustand";
import { Store, DataState, DataStore, GeoJSONExtended } from "@geojson/store/types";
import { configureFCProperties, getAssociatedValue, validateFC } from "@geojson/utils/featureCollection";

const dataStateInitialValue: DataState = {
  geoJSONKey: null,

  features: [],

  propertiesKeys: [],

}

export const createDataSlice: StateCreator<Store, [], [], DataStore> = (set, get) => ({
  ...dataStateInitialValue,


  importGeoJSON: (jsonString) => {
    const { json, propertiesKeys } = configureFCProperties(validateFC(JSON.parse(jsonString) as unknown as GeoJSONExtended))

    set(({
      legends: [],
      legendKey: "",
      legendTitle: "",
      geoJSONKey: v4(),
      features: json.features,
      propertiesKeys: propertiesKeys,
    }))
  },

  deleteFeaturebyUUIDs: (uuids) => set((state) => {
    const features = state.features.filter(item => !uuids.includes(item.uuid))

    if (!features.length) return dataStateInitialValue

    return { features: features }
  }),

  updateFeatureProperties: (uuid, properties) => set((state) => ({
    features: state.features.map((item) => {
      if (item.uuid !== uuid) return item;

      const key = get().legendKey
      
      // update color properties and radius for proportional circle
      // if legend key is exist and the current value is different 
      // from updated value.
      if (key && properties[key] !== item.properties[key]) {
        const { color, percentRadius } = getAssociatedValue(properties[key], get().legends)
        
        return { 
          ...item,
          point: { ...item.point, radius: percentRadius },
          properties: { ...properties, color: color }
        }
      }

      return { ...item, properties: properties }
    })
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

  syncFeaturesWithLegend: () => set((state) => {
    const key = get().legendKey
    
    const propertiesKey = get().propertiesKeys

    // do not update if legend key does not exist
    if (!key || !propertiesKey.includes(key)) return { }

    return {
      features: state.features.map((item) => {
        const { color, percentRadius } = getAssociatedValue(item.properties[key], get().legends)
        return {
          ...item,
          point: { ...item.point, radius: percentRadius },
          properties: { ...item.properties, color: color }
        }
      }),
    }
  }),

  updatePointCoordinate: (uuid, lat, lng) => set(state => ({
    features: state.features.map(item => item.uuid !== uuid ? item : { ...item, point: { ...item.point, lat: lat, lng: lng } })
  })),

  downloadGeoJSON: () => {
    const geoJSON = {
      type: "FeatureCollection",
      features: get().features.map(feature => ({
        properties: { ...feature.properties },
        geometry: { ...feature.geometry },
        type: feature.type,
      }))
    }

    return JSON.stringify(geoJSON)
  }
})