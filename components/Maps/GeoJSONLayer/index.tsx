import { GeoJSON } from "./GeoJSON";
import { LatLngBounds } from "leaflet";
import { useMap, FeatureGroup } from "react-leaflet";
import { useEffect, useRef } from "react";
import { useGeoJSONStore } from "lib/store/geoJSONStore";

export const GeoJSONLayer = () => {
  const map = useMap()
  const geojsonRef = useRef<L.FeatureGroup>(null)
  const mapKey = useGeoJSONStore(state => state.mapKey)
  const geoJSON = useGeoJSONStore(state => state.geoJSON)

  useEffect(() => {
    geoJSON && map.fitBounds(geojsonRef.current?.getBounds() as LatLngBounds)
  }, [geoJSON, map])

  return geoJSON && geoJSON.features && (
    <FeatureGroup ref={geojsonRef} key={mapKey}>
      {geoJSON.features.map((item) => <GeoJSON key={item.properties?.uuid} feature={item} />)}
    </FeatureGroup>
  )
};