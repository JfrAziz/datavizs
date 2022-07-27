import { FeatureGroup, Map } from "leaflet";
import { BaseMap } from "@config/maps";
import { Feature, FeatureCollection, Geometry } from "geojson";
import { RefObject } from "react";


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
 * color generator. 
 * 
 */
export type LegendOptions = {
  show: boolean

  // 
  position: {
    x: number

    y: number
  }
  width?: number

  // 
  spacing: number

  direction: "column" | "row"

  // 
  backgroundColor: string

  textColor: string

  // 
  textSize: number

  symbolSize: number
}

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

  legendOptions: LegendOptions;
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
  mapRef: Map | null;

  baseMap: BaseMap | null;

  mapWrapper: MapWrapper

  mapWrapperRef: RefObject<HTMLDivElement> | null;

  showControl: boolean;
}

export interface MapFunction {
  setMapRef: (map: Map) => void

  setBaseMap: (value: BaseMap | null) => void

  setMapWrapper: (wrapper: MapWrapper) => void

  setMapToCenter: () => void

  downloadMap: (format?: "png" | "jpeg" | "svg") => void

  toggleControl: () => void;
}

export type MapStore = MapState & MapFunction


/**
 * All combined state
 * 
 */
export type DataStore = GeoJSONStore & LegendStore & MapStore
