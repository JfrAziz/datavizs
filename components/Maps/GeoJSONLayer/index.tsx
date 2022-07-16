import { GeoJSON } from "./GeoJSON";
import { LatLngBounds } from "leaflet";
import { useEffect, useRef } from "react";
import { useMap, FeatureGroup } from "react-leaflet";
import { useGeoJSONStore } from "@store/geoJSONStore";

export const GeoJSONLayer = () => {
  const map = useMap()
  const geojsonRef = useRef<L.FeatureGroup>(null)
  const mapKey = useGeoJSONStore(state => state.mapKey)
  const features = useGeoJSONStore(state => state.features)

  useEffect(() => {
    features.length && map.fitBounds(geojsonRef.current?.getBounds() as LatLngBounds)
  }, [features, map])

  return features && (
    <FeatureGroup ref={geojsonRef} key={mapKey}>
      {features.map((item) => <GeoJSON key={item.properties.uuid} feature={item} />)}
    </FeatureGroup>
  )
};