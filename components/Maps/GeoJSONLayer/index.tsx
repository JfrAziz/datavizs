import { GeoJSON } from './GeoJSON';
import { LatLngBounds } from "leaflet";
import { Feature } from "geojson"
import { GeoJSONPopup } from './GeoJSONPopup';
import { FC, useContext, useEffect, useRef } from "react";
import { useMap, FeatureGroup, Popup } from "react-leaflet";
import { GeoJSONContext } from "../../Context/GeoJSONContext";

const GeoJSONWithPopup: FC<{ feature: Feature }> = ({ feature }) => {
  return (
    <GeoJSON data={feature}>
      <Popup minWidth={100} closeButton={false}>
        <GeoJSONPopup properties={feature.properties}></GeoJSONPopup>
      </Popup>
    </GeoJSON>
  )
}

export const GeoJSONLayer = () => {
  const map = useMap()
  const geojsonRef = useRef<L.FeatureGroup>(null)
  const { geoJSON, mapKey } = useContext(GeoJSONContext)

  useEffect(() => {
    geoJSON && map.fitBounds(geojsonRef.current?.getBounds() as LatLngBounds)
  }, [geoJSON, map])

  return geoJSON && geoJSON.features && (
    <FeatureGroup ref={geojsonRef} key={mapKey}>
      {geoJSON.features.map((item) => <GeoJSONWithPopup key={item.properties?.uuid} feature={item} />)}
    </FeatureGroup>
  )
};