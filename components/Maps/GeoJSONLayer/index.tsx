import { LatLngBounds } from "leaflet";
import { useStore } from "@stores/maps";
import { useEffect, useRef } from "react";
import { useDebounce } from "@utils/debounce";
import { GeoJSONPopup } from "./GeoJSONPopup";
import { GeoJSONComponent } from "./GeoJSONComponent";
import { useMap, FeatureGroup, Popup } from "react-leaflet";
import { FeatureExtended, FeatureProperties } from "@stores/maps/types";


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
  const geojsonRef = useRef<L.FeatureGroup>(null)
  const mapKey = useStore(state => state.mapKey)
  const features = useStore(state => state.features)

  const updateFeatureByUUID = useDebounce(useStore.getState().updateFeatureByUUID, 500)

  useEffect(() => {
    features.length && map.fitBounds(geojsonRef.current?.getBounds() as LatLngBounds)
  }, [features, map])

  return features && (
    <FeatureGroup ref={geojsonRef} key={mapKey}>
      {features.map((item) => <GeoJSON key={item.properties.uuid} updateProperties={updateFeatureByUUID} feature={item} />)}
    </FeatureGroup>
  )
};