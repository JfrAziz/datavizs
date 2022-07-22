import { FeatureGroup, Map } from "leaflet";
import { BaseMap } from "@config/maps";
import { Feature, FeatureCollection, Geometry } from "geojson";


/**
 * Extended Feature Collection with custom properties. Every features has uuid 
 * properties to make easier to update, delete, and rendered on react component
 */
export interface FeatureProperties {
  uuid: string;
  color: string;
  [name: string]: any;
}

export type FeatureExtended = Feature<Geometry, FeatureProperties>

export type GeoJSONExtended = FeatureCollection<Geometry, FeatureProperties>


/**
 * GeoJSON state and function for handle features collection data
 * 
 */
export interface GeoJSONState extends Omit<GeoJSONExtended, "type"> {
  geoJSONKey: string | null;

  geoJSONRef: FeatureGroup | null;

  features: GeoJSONExtended["features"] | [];

  propertiesKeys: string[];
}

export interface GeoJSONFunction {

  importGeoJSON: (jsonString: string) => void;

  setGeoJSONRef: (geoJSON: FeatureGroup | null) => void;

  updateFeatureByUUID: (uuid: string, properties: FeatureProperties) => void;

  deleteFeaturebyUUIDs: (uuids: string[]) => void;

  addPropertiesKey: (key: string) => void;

  deletePropertiesKey: (key: string) => void;

  updateFeatureColor: (key: string, legends: Legend[]) => void;
}

export type GeoJSONStore = GeoJSONState & GeoJSONFunction

/**
 * Legend state and function for handle legend data and 
 * color generator. Legend value is an array value with
 * size 1 or 2. If the type is equals, just index 0 is used
 * for comparison, but if the type is range, index 0 and 1
 * were used. example [a, b] will be compared a <= value < b 
 * 
 */
export type minMaxValue = {
  min: number | undefined

  max: number | undefined
}

interface LegendCreator<T extends "single" | "range"> {
  uuid: string;

  color: string;

  label: string;

  hidden: boolean

  type: T;

  value: T extends "single" ? string : minMaxValue
}

export type Legend = LegendCreator<"single"> | LegendCreator<"range">

export interface LegendState {
  legends: Legend[];
}

export interface LegendFunction {
  addLegends: () => void;

  updateLegend: (uuid: string, legend: Legend) => void;

  deleteLegend: (uuid: string) => void;

  resetLegends: () => void;

  generateGradient: () => void
}

export type LegendStore = LegendState & LegendFunction


/**
 * Map Settings state for handle maps
 * 
 */
type MapWrapper = { type: "auto" } | {
  type: "custom"

  width?: number;

  height?: number
}

export interface MapState {
  map: Map | null;

  showControl: boolean;

  baseMap: BaseMap | null;

  mapWrapper: MapWrapper
}

export interface MapFunction {
  setMap: (map: Map) => void

  setBaseMap: (value: BaseMap | null) => void

  setMapWrapper: (wrapper: MapWrapper) => void

  toggleControl: () => void;

  setMapToCenter: () => void
}

export type MapStore = MapState & MapFunction


/**
 * All combined state
 * 
 */
export type DataStore = GeoJSONStore & LegendStore & MapStore
