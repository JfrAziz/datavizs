import { FeatureCollection } from "geojson";
import { v4 } from "uuid";
import { GeoJSONState } from "./GeoJSONContext.types";


export const createGeoJSON = (value: string): GeoJSONState => {
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

  return { mapKey: v4(), geoJSON: json }
}



