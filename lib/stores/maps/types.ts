import { BaseMap } from "@config/baseMaps";
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

  mapKey: string | null;

  features: GeoJSONExtended["features"] | [];

  propertiesKeys: string[];
}

export interface GeoJSONFunction {

  importGeoJSON: (jsonString: string) => void;

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

interface LegendCreator<T extends "single" | "range"> {
  uuid: string;

  color: string;

  label: string;

  hidden: boolean

  type: T;

  value: T extends "single" ? string : {
    min: number | undefined
    max: number | undefined
  }
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
export interface MapState {
  showControl: boolean;

  baseMap: BaseMap | null;
}

export interface MapFunction {
  setBaseMap: (value: BaseMap | null) => void

  toggleControl: () => void;
}

export type MapStore = MapState & MapFunction


/**
 * All combined state
 * 
 */
export type DataStore = GeoJSONStore & LegendStore & MapStore
