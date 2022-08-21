import { useEffect } from "react";
import { useStore } from "@geojson/store";
import { handleNaN } from "@lib/utils/NaN";
import { GeoJSONComponent } from "./GeoJSONComponent";
import { useMap, FeatureGroup, Circle } from "react-leaflet";


export const GeoJSONLayer = () => {
  const map = useMap()
  const features = useStore(state => state.features)

  const geoJSONKey = useStore(state => state.geoJSONKey)

  const geojsonRef = useStore(state => state.geoJSONRef)

  const proportionalCircle = useStore(state => state.proportionalCircle)

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
      {proportionalCircle.show && features.map((item) => {

        const radius = handleNaN(proportionalCircle.min, 0) + item.point.radius * (handleNaN(proportionalCircle.max, 0) - handleNaN(proportionalCircle.min, 0))

        return <Circle
          key={item.uuid}
          center={item.point}
          radius={radius}
          pathOptions={{
            weight: 2,
            color: proportionalCircle.borderColor,
            fillColor: proportionalCircle.color,
            fillOpacity: 1
          }} />
      })}
    </FeatureGroup>

  )
};