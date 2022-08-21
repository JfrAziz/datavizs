import { useEffect } from "react";
import { useStore } from "@geojson/store";
import { GeoJSONComponent } from "./GeoJSONComponent";
import { useMap, FeatureGroup, Circle } from "react-leaflet";


export const GeoJSONLayer = () => {
  const map = useMap()
  const features = useStore(state => state.features)
  const geoJSONKey = useStore(state => state.geoJSONKey)
  const geojsonRef = useStore(state => state.geoJSONRef)

  const setGeoJSONRef = useStore.getState().setGeoJSONRef

  useEffect(() => {
    if (!features.length) return;

    if (!geojsonRef || Object.keys(geojsonRef.getBounds()).length === 0) return;

    map.fitBounds(geojsonRef.getBounds())
  }, [geojsonRef])

  if (!features.length) return null;

  return (
    <FeatureGroup ref={setGeoJSONRef} key={geoJSONKey}>
      {features.map((item) => <GeoJSONComponent key={item.uuid} feature={item} />)}
      {/* {features.map((item) => <Circle key={item.uuid} center={item.point} radius={item.point.radius} pathOptions={{ color: item.point.color, fillColor: item.point.color }} />)} */}
    </FeatureGroup>

  )
};