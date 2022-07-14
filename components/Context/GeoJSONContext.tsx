import React, { createContext, useState } from "react";
import { FeatureCollection } from "geojson";
import { v4 } from "uuid";

interface geoJSONDataContextValue {
  mapKey: string | null;
  geoJSON: FeatureCollection | null;
  setGeoJSON: (value: string) => void;
  deleteGeoJSONFirtsIndex: () => void;
}

const geoJSONDataInitialState: geoJSONDataContextValue = {
  mapKey: null,
  geoJSON: null,
  setGeoJSON: (value: string) => { },
  deleteGeoJSONFirtsIndex: () => {}
}

export const GeoJSONContext = createContext<geoJSONDataContextValue>(geoJSONDataInitialState)

export function GeoJSONProvider(props: React.PropsWithChildren) {
  const [geoJSON, setData] = useState(geoJSONDataInitialState.geoJSON)
  const [mapKey, setMapKey] = useState(geoJSONDataInitialState.mapKey)

  const setGeoJSON = (value: string) => {
    const json = JSON.parse(value) as unknown as FeatureCollection

    if (!(json?.type === 'FeatureCollection')) throw new Error("GeoJSON Not Valid");

    if (!(json?.features)) throw new Error("GeoJSON has emtpy value");

    // add a uuid foreach features properties
    json.features.forEach((item, idx) => {
      if (!json.features[idx].properties) {
        Object.assign(json.features[idx], { properties: {} })
      }

      if (!json.features[idx].properties?.uuid) {
        Object.assign(json.features[idx].properties as {}, { uuid: v4() })
      }
    });

    setMapKey(v4())
    setData(json)
  }

  const deleteGeoJSONFirtsIndex = () => {
    if (geoJSON) {
      setData({ type: "FeatureCollection", features: geoJSON.features.filter((item, id) => id !== 1) })
    }
  }

  return (
    <GeoJSONContext.Provider value={{ mapKey, geoJSON, setGeoJSON, deleteGeoJSONFirtsIndex }}>
      {props.children}
    </GeoJSONContext.Provider>
  )
}