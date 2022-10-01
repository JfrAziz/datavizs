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

    /**
     * percent of max to min, radius will be calculate by 
     * 
     * radius (meters) = min + percentOfRadius * (max - min)
     */
    radius: number 
  }
}

export interface GeoJSONExtended extends FeatureCollection {
  features: Array<FeatureExtended>
}


/**
 * Data state and function for handle features collection data
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

  syncFeaturesWithLegend: () => void;

  updatePointCoordinate: (uuid: string, lat: number, lng: number) => void;

  downloadGeoJSON: () => string
}

export type DataStore = DataState & DataFunction

/**
 * Maps Information state and function for handle legend and color,
 * proportional circle, and and label
 * 
 */
export type LegendSettings = {
  show: boolean

  key: string

  title: string

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

export interface ProportionalCircle {
  show: boolean;

  min: number

  max: number

  color: string

  borderColor: string
}

export interface LabelSettings {
  show: boolean

  key: string

  color: string

  size: number
}

export interface MapInformationState {
  legends: Legend[];

  legendSettings: LegendSettings;

  proportionalCircle: ProportionalCircle

  labelSettings: LabelSettings
}

export interface MapInformationFunction {
  addLegends: () => void;

  updateLegend: (uuid: string, legend: Legend) => void;

  deleteLegend: (uuid: string) => void;

  resetLegends: () => void;

  moveLegend: (from: number, to: number) => void;

  sortLegend: (by: "label" | "value", order: "asc" | "desc") => void

  resetLegendSettings: () => void;

  updateLegendSettings: (legend: Partial<LegendSettings>) => void;

  generateGradient: () => void;

  generateUniqueLegends: (key: string) => void;

  generateQuantileLegends: (key: string, quantile: number[]) => void;

  updateProportionalCircle: (settings: Partial<ProportionalCircle>) => void

  updateLabelSettings: (settings: Partial<LabelSettings>) => void
}

export type MapInformationStore = MapInformationState & MapInformationFunction


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

  borderWidth: number
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

  geoJSONSettings: GeoJSONSettings

}

export interface SettingsFunction {
  setMapRef: (map: Map) => void

  setGeoJSONRef: (geoJSON: FeatureGroup | null) => void;

  setBaseMap: (value: BaseMap | null) => void

  setMapWrapper: (wrapper: Partial<MapWrapper>) => void

  setMapToCenter: () => void

  downloadMap: (format?: "png" | "jpeg" | "svg") => void

  updateGeoJSONSettings: (settings: Partial<GeoJSONSettings>) => void;
}

export type SettingsStore = SettingsState & SettingsFunction


/**
 * All combined state
 * 
 */
export type Store = DataStore & MapInformationStore & SettingsStore
