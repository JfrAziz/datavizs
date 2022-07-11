import React, { createContext, useState } from "react";
import { GeoJsonObject } from "geojson";

interface geoJSONDataContextValue {
  key: string | null;
  geoJSON: GeoJsonObject | null;
  setGeoJSON: (value: string, key: string) => void
}

const geoJSONDataInitialState: geoJSONDataContextValue = {
  key: null,
  geoJSON: null,
  setGeoJSON: (value: string, key: string) => { }
}

export const GeoJSONContext = createContext<geoJSONDataContextValue>(geoJSONDataInitialState)

export function GeoJSONProvider(props: React.PropsWithChildren) {
  const [geoJSON, setData] = useState(geoJSONDataInitialState.geoJSON)
  const [key, setKey] = useState(geoJSONDataInitialState.key)

  const setGeoJSON = (value: string, key: string) => {
    const json = JSON.parse(value) as unknown as GeoJsonObject
    setKey(key)
    setData(json)
  }

  return (
    <GeoJSONContext.Provider value={{ key, geoJSON, setGeoJSON }}>
      {props.children}
    </GeoJSONContext.Provider>
  )
}