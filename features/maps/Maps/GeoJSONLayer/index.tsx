import { useEffect } from "react";
import { useStore } from "features/maps/store";
import { useMap, FeatureGroup } from "react-leaflet";
import { GeoJSONComponent } from "./GeoJSONComponent";
import { ProportionalCircle } from "./ProportionalCircle";


export const GeoJSONLayer = () => {
  const map = useMap()
  const features = useStore(state => state.features)

  const geoJSONKey = useStore(state => state.geoJSONKey)

  const geojsonRef = useStore(state => state.geoJSONRef)

  const circleSettings = useStore(state => state.proportionalCircle)

  const geoJSOnSettings = useStore(state => state.geoJSONSettings)

  const setGeoJSONRef = useStore.getState().setGeoJSONRef

  useEffect(() => {
    if (!features.length) return;

    if (!geojsonRef || Object.keys(geojsonRef.getBounds()).length === 0) return;

    map.fitBounds(geojsonRef.getBounds())
  }, [geojsonRef])

  if (!features.length) return null;

  return (
    <FeatureGroup ref={setGeoJSONRef} key={geoJSONKey}>
      {features.map((item) => <GeoJSONComponent key={item.uuid} feature={item} settings={geoJSOnSettings} />)}
      {circleSettings.show &&
        features.map((item) => <ProportionalCircle key={item.uuid} feature={item} settings={circleSettings} />)}
    </FeatureGroup>
  )
};