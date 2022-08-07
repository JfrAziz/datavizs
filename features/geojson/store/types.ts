import { RefObject } from "react";
import { BaseMap } from "@config/leaflet";
import { FeatureGroup, Map } from "leaflet";
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

  size: {
    width: number | "auto"

    height: number | "auto"
  }

  // 
  spacing: number

  direction: "column" | "row"

  // 
  backgroundColor: string

  fontColor: string

  // 
  fontSize: number

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

  resetLegendOptions: () => void;

  updateLegendOptions: (legend: Partial<LegendOptions>) => void;

  generateGradient: () => void;

  generateUniqueLegends: (key: string) => void;

  generateQuantileLegends: (key: string, quantile: number[]) => void
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

  showMapControls: boolean;
}

export interface MapFunction {
  setMapRef: (map: Map) => void

  setBaseMap: (value: BaseMap | null) => void

  setMapWrapper: (wrapper: Partial<MapWrapper>) => void

  setMapToCenter: () => void

  downloadMap: (format?: "png" | "jpeg" | "svg") => void

  toggleMapControls: () => void;
}

export type MapStore = MapState & MapFunction


/**
 * All combined state
 * 
 */
export type DataStore = GeoJSONStore & LegendStore & MapStore
