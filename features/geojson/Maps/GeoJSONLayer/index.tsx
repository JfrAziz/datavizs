import { useEffect } from "react";
import { useStore } from "@geojson/store";
import { GeoJSONPopup } from "./GeoJSONPopup";
import { useDebounce } from "@lib/utils/debounce";
import { GeoJSONComponent } from "./GeoJSONComponent";
import { useMap, FeatureGroup, Popup } from "react-leaflet";
import { FeatureExtended, FeatureProperties } from "@geojson/store/types";


interface GeoJSONProps {
  feature: FeatureExtended
  updateProperties: (uuid: string, properties: FeatureProperties) => void
}

const GeoJSON = ({ feature, updateProperties }: GeoJSONProps) => (
  <GeoJSONComponent data={feature}>
    <Popup minWidth={100} closeButton={false}>
      <GeoJSONPopup properties={feature.properties} updateProperties={updateProperties} />
    </Popup>
  </GeoJSONComponent>
)

export const GeoJSONLayer = () => {
  const map = useMap()
  const features = useStore(state => state.features)
  const geoJSONKey = useStore(state => state.geoJSONKey)
  const geojsonRef = useStore(state => state.geoJSONRef)

  const setGeoJSONRef = useStore.getState().setGeoJSONRef
  const updateFeatureByUUID = useDebounce(useStore.getState().updateFeatureByUUID, 500)

  useEffect(() => {
    if (!features.length) return;

    if (!geojsonRef || Object.keys(geojsonRef.getBounds()).length === 0) return;

    map.fitBounds(geojsonRef.getBounds())
  }, [geojsonRef])

  if (!features.length) return null;

  return (
    <FeatureGroup ref={setGeoJSONRef} key={geoJSONKey}>
      {features.map((item) => <GeoJSON key={item.properties.uuid} updateProperties={updateFeatureByUUID} feature={item} />)}
    </FeatureGroup>
  )
};