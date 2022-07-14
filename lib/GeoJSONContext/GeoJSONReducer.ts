import { createGeoJSON } from "./GeoJSONActions";
import { GeoJSONAction, GeoJSONState, GeoJSONActionType } from "./GeoJSONContext.types";

export const geoJSONReducer = (_state: GeoJSONState, action: GeoJSONAction) : GeoJSONState => {
  switch (action.type) {
    case GeoJSONActionType.CREATE_GEOJSON: createGeoJSON(action.payload)
    default: {
      throw new Error(`Unhandled action type - ${JSON.stringify(action)}`);
    }
  }
}