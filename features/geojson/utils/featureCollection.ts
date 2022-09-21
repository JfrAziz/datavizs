import { v4 } from "uuid";
import area from "@turf/area"
import bbox from "@turf/bbox";
import pointOnFeature from "@turf/point-on-feature";
import { AllGeoJSON, Geometry } from "@turf/helpers";
import { DEFAULT_FEATURE_COLOR } from "@config/leaflet";
import { GeoJSONExtended, Legend } from "@geojson/store/types";


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

    const featureArea = area(item.geometry as Geometry);

    const bboxFeature = bbox(item.geometry)

    console.log(bboxFeature)

    Object.assign(json.features[idx], {
      point: {
        lat: point.geometry.coordinates[1],
        lng: point.geometry.coordinates[0],
        radius: 0, // percent of max and min
      },
      area: featureArea,
      bbox: bboxFeature
    })
  });

  const propertiesKeys = Object.keys(json.features[0].properties)

  return { json, propertiesKeys };
}

/**
 * Legend value is an array value with size 1 or 2. If the type is equals, 
 * just index 0 is used for comparison, but if the type is range, index 0 and 1
 * were used. example [a, b] will be compared a <= value < b 
 * 
 * @param value 
 * @param legends 
 * @returns string
 */
export const getAssociatedValue = (value: string | number, legends: Legend[]): { color: string, percentRadius: number } => {
  let selectedLegend: Legend | undefined = undefined

  selectedLegend = legends.find(item => {
    if (item.type === "single") return item.value.toString() === value.toString()

    if (item.value.min === undefined || item.value.max === undefined) return false

    return item.value.min <= value && item.value.max >= value
  })

  if (selectedLegend === undefined) return { color: DEFAULT_FEATURE_COLOR, percentRadius: 0 };

  const idx = legends.findIndex(item => item.uuid === selectedLegend?.uuid)

  return { color: selectedLegend.color, percentRadius: (idx + 1) / legends.length }
}