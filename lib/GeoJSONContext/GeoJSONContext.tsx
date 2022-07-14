import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { geoJSONReducer } from "./GeoJSONReducer";
import { GeoJSONAction, GeoJSONState } from "./GeoJSONContext.types";

export const GeoJSONContext = createContext<GeoJSONState>({} as GeoJSONState)
export const GeoJSONContextDispatch = createContext<Dispatch<GeoJSONAction>>({} as Dispatch<GeoJSONAction>)

export function GeoJSONProvider(props: React.PropsWithChildren) {
  const [{ mapKey, geoJSON }, dispatch] = useReducer(geoJSONReducer, {
    mapKey: null,
    geoJSON: null
  })

  return (
    <GeoJSONContext.Provider value={{ mapKey, geoJSON }}>
      <GeoJSONContextDispatch.Provider value={dispatch}>
        {props.children}
      </GeoJSONContextDispatch.Provider>
    </GeoJSONContext.Provider>
  )
}

export const useGeoJSONContext = () => [ useContext(GeoJSONContext), useContext(GeoJSONContextDispatch) ]