import { FeatureCollection } from "geojson";

export interface GeoJSONState {
  mapKey: string | null;
  geoJSON: FeatureCollection | null;
}

export enum GeoJSONActionType {
  CREATE_GEOJSON = "create_geojson",
  DELETE_GEOJSON_FIRST_INDEX = "delete_geojson_first_index",
}

export type GeoJSONAction =
  | {
    type: GeoJSONActionType.CREATE_GEOJSON;
    payload: string;
  }
  | {
    type: GeoJSONActionType.DELETE_GEOJSON_FIRST_INDEX;
  }

