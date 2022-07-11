import React, { createContext, useState } from "react";
import { GeoJsonObject } from "geojson";

interface geoJSONDataContextValue {
  geoJSON: GeoJsonObject | null;
  setGeoJSON: (value: string) => void
}

const geoJSONDataInitialState: geoJSONDataContextValue = {
  geoJSON: null,
  setGeoJSON: (value: string) => { }
}

export const GeoJSONContext = createContext<geoJSONDataContextValue>(geoJSONDataInitialState)

export function GeoJSONProvider(props: React.PropsWithChildren) {
  const [geoJSON, setData] = useState(geoJSONDataInitialState.geoJSON)

  const setGeoJSON = (value: string) => {
    const json = JSON.parse(value) as unknown as GeoJsonObject
    setData(json)
  }

  return (
    <GeoJSONContext.Provider value={{ geoJSON, setGeoJSON }}>
      {props.children}
    </GeoJSONContext.Provider>
  )
}