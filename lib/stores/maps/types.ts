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

  updateFeatureColor: (key: string, color: Legend[], operator: LegendOperator) => void;
}

export type GeoJSONStore = GeoJSONState & GeoJSONFunction

/**
 * Legend state and function for handle legend data and 
 * color generator
 * 
 */
export interface Legend {
  value: string | number;

  color: string;

  hidden: boolean;
}

export type LegendOperator = "less-than" | "greater-than" | "equal"

export interface LegendState {
  legends: Legend[];
}

export interface LegendFunction {
  addLegends: () => void;

  updateLegendValue: (idx: number, value: string) => void;

  updateLegendColor: (idx: number, color: string) => void;

  toggleHiddenLegend: (idx: number) => void;

  deleteLegend: (idx: number) => void;

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
