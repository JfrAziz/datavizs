import React, { createContext, useState } from "react";
import { FeatureCollection } from "geojson";
import { v4 } from "uuid";

interface geoJSONDataContextValue {
  key: string | null;
  geoJSON: FeatureCollection | null;
  setGeoJSON: (value: string) => void;
  updateGeoJSON: (featuresIdx: number) => void;
}

const geoJSONDataInitialState: geoJSONDataContextValue = {
  key: null,
  geoJSON: null,
  setGeoJSON: (value: string) => { },
  updateGeoJSON: (featuresIdx: number) => { },
}

export const GeoJSONContext = createContext<geoJSONDataContextValue>(geoJSONDataInitialState)

export function GeoJSONProvider(props: React.PropsWithChildren) {
  const [geoJSON, setData] = useState(geoJSONDataInitialState.geoJSON)
  const [key, setKey] = useState(geoJSONDataInitialState.key)

  const setGeoJSON = (value: string) => {
    try {
      const json = JSON.parse(value) as unknown as FeatureCollection

      if (!(json?.type === 'FeatureCollection')) throw new Error("GeoJSON Not Valid");
      
      if (!(json?.features)) throw new Error("GeoJSON has emtpy value");
      
      setKey(v4())
      setData(json)
    } catch (error) {
      console.log(error)
    }
  }

  const updateGeoJSON = (featuresIdx: number) => {
    if (geoJSON) {
      setData({ type: "FeatureCollection", features: geoJSON.features.filter((item, id) => id !== featuresIdx)})
      // setKey(v4())
    }
  }

  return (
    <GeoJSONContext.Provider value={{ key, geoJSON, setGeoJSON, updateGeoJSON }}>
      {props.children}
    </GeoJSONContext.Provider>
  )
}