import { v4 } from 'uuid';
import create from 'zustand'
import { omit } from '@utils/omit';
import { FeatureColor, getFeatureColor, Operator } from '@utils/featureColor';
import { validateFC, GeoJSONExtended, FeatureProperties, configureFCProperties, } from '@utils/featureCollection';


interface GeoJSONState extends Omit<GeoJSONExtended, "type"> {

  mapKey: string | null;

  features: GeoJSONExtended["features"] | [];

  propertiesKeys: string[];

  importGeoJSON: (jsonString: string) => void;

  updateFeatureByUUID: (uuid: string, properties: FeatureProperties) => void;

  deleteFeaturebyUUIDs: (uuids: string[]) => void;

  addPropertiesKey: (key: string) => void;

  deletePropertiesKey: (key: string) => void;

  updateFeatureColor: (key: string, color: FeatureColor[], operator: Operator) => void;
}

const geoJSONStateInitialValue = {
  mapKey: null,

  features: [],

  propertiesKeys: [],

}

export const useGeoJSONStore = create<GeoJSONState>()((set, get) => ({
  ...geoJSONStateInitialValue,

  importGeoJSON: (jsonString) => {
    const { json, propertiesKeys } = configureFCProperties(validateFC(JSON.parse(jsonString) as unknown as GeoJSONExtended))

    set(({ mapKey: v4(), features: json.features, propertiesKeys: propertiesKeys }))
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

  updateFeatureColor: (key, colors, operator) => set((state) => ({
    features: state.features.map((item) => ({ ...item, properties: { ...item.properties, color: getFeatureColor(item.properties[key], colors, operator) } })),
  }))
}))