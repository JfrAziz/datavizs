import { RefObject } from "react";
import { BaseMap } from "@config/leaflet";
import { FeatureGroup, Map } from "leaflet";
import { Feature, FeatureCollection, Geometry } from "geojson";


/**
 * Extended Feature Properties with color properties to save color on each features
 */
export interface FeatureProperties {
  color: string;

  [name: string]: any;
}

/**
 * Every features has uuid to make easier to update, delete, and rendered on react component
 */
export interface FeatureExtended extends Feature<Geometry, FeatureProperties> {
  uuid: string

  point: {
    lat: number

    lng: number

    radius: number

    color: string
  }
}

export interface GeoJSONExtended extends FeatureCollection {
  features: Array<FeatureExtended>
}


/**
 * GeoJSON state and function for handle features collection data
 * 
 */
export interface DataState extends Omit<GeoJSONExtended, "type"> {
  geoJSONKey: string | null;

  features: GeoJSONExtended["features"] | [];

  propertiesKeys: string[];
}

export interface DataFunction {

  importGeoJSON: (jsonString: string) => void;

  updateFeatureProperties: (uuid: string, properties: FeatureProperties) => void;

  deleteFeaturebyUUIDs: (uuids: string[]) => void;

  addPropertiesKey: (key: string) => void;

  deletePropertiesKeys: (keys: string[]) => void;

  syncFeatureWithLegend: (key: string, legends: Legend[]) => void;

  updatePointCoordinate: (uuid: string, lat: number, lng: number) => void
}

export type DataStore = DataState & DataFunction

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

interface ProportionalCircle {
  min: number

  max: number

  color: string
}

export interface LegendState {
  legends: Legend[];

  legendTitle: string;

  legendOptions: LegendOptions;
}

export interface LegendFunction {
  addLegends: () => void;

  updateLegend: (uuid: string, legend: Legend) => void;

  deleteLegend: (uuid: string) => void;

  resetLegends: () => void;

  moveLegend: (from: number, to: number) => void;

  sortLegend: (by: "label" | "value", order: "asc" | "desc") => void

  resetLegendOptions: () => void;

  updateLegendOptions: (legend: Partial<LegendOptions>) => void;

  generateGradient: () => void;

  generateUniqueLegends: (key: string) => void;

  generateQuantileLegends: (key: string, quantile: number[]) => void;

  updateLegendTitle: (title: string) => void
}

export type LegendStore = LegendState & LegendFunction


/**
 * MapWrapper for handing map size
 */
type MapWrapper = { type: "auto" } | {
  type: "custom"

  width?: number;

  height?: number
}

/**
 * global features settings
 */
export interface GeoJSONSettings {
  opacity: number

  borderColor: string

  borderOpacity: number  
}

/**
 * State value for all settings
 */
export interface SettingsState {
  mapRef: Map | null;

  geoJSONRef: FeatureGroup | null;

  mapWrapperRef: RefObject<HTMLDivElement> | null;
  
  mapWrapper: MapWrapper

  baseMap: BaseMap | null;

  showMapControls: boolean;

  geoJSONSettings: GeoJSONSettings

}

export interface SettingsFunction {
  setMapRef: (map: Map) => void

  setGeoJSONRef: (geoJSON: FeatureGroup | null) => void;

  setBaseMap: (value: BaseMap | null) => void

  setMapWrapper: (wrapper: Partial<MapWrapper>) => void

  setMapToCenter: () => void

  downloadMap: (format?: "png" | "jpeg" | "svg") => void

  toggleMapControls: () => void;
}

export type SettingsStore = SettingsState & SettingsFunction


/**
 * All combined state
 * 
 */
export type Store = DataStore & LegendStore & SettingsStore
