import { v4 } from "uuid";
import { FeatureCollection } from "geojson";

export const validateFC = (json: FeatureCollection) => {
  if (!(json?.type === 'FeatureCollection')) throw new Error("GeoJSON Not Valid");

  if (!(json?.features)) throw new Error("GeoJSON has emtpy value");

  return json
}

export const configureFCProperties = (json: FeatureCollection) : FeatureCollection => {
  json.features.forEach((item, idx) => {
    if (!json.features[idx].properties) {
      Object.assign(json.features[idx], { properties: {} })
    }

    if (!json.features[idx].properties?.uuid) {
      Object.assign(json.features[idx].properties as {}, { uuid: v4() })
    }
  });

  return json;
}