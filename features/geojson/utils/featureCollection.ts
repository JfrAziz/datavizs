import { v4 } from "uuid";
import { AllGeoJSON } from "@turf/helpers";
import pointOnFeature from "@turf/point-on-feature";
import { GeoJSONExtended } from "@geojson/store/types";
import { DEFAULT_FEATURE_COLOR } from "@config/leaflet";
import centerOfMass from "@turf/center-of-mass";
import centroid from "@turf/centroid";


/**
 * Simple validation for GeoJSONExtended. It checks the GeoJSON type and
 * the lenght of the features properties.
 * 
 * @param json 
 * @returns 
 */
export const validateFC = (json: GeoJSONExtended): GeoJSONExtended => {
  if (!(json.type === 'FeatureCollection') || !(json.features))
    throw new Error("GeoJSON is not features collection");

  if (!json.features.length) throw new Error("GeoJSON has emtpy value");

  return json
}

/**
 * Configures a validated GeoJSON Feature collection to add a new properties
 * for each feature with add a uuid. Sometimes imported geoJSON file does not 
 * have a properties value, so we added first then we add a uuid to it.
 * 
 * This function also return list key of properties except uuid, it will be used in
 * any component for editing an so on.
 * 
 * @param json 
 * @returns 
 */
export const configureFCProperties = (json: GeoJSONExtended): { json: GeoJSONExtended, propertiesKeys: string[] } => {
  json.features.forEach((item, idx) => {
    // set UUID
    Object.assign(json.features[idx], { uuid: v4() })

    // set properties
    if (!json.features[idx].properties) {
      Object.assign(json.features[idx], { properties: {} })
    }

    if (!json.features[idx].properties?.color) {
      Object.assign(json.features[idx].properties, { color: DEFAULT_FEATURE_COLOR })
    }

    // get point on features
    const point = pointOnFeature(item as AllGeoJSON)

    Object.assign(json.features[idx], {
      coordinates: {
        x: point.geometry.coordinates[0],
        y: point.geometry.coordinates[1]
      }
    })
  });

  const propertiesKeys = Object.keys(json.features[0].properties)

  return { json, propertiesKeys };
}