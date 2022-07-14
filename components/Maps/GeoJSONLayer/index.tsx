import { GeoJSON } from "./GeoJSON";
import { LatLngBounds } from "leaflet";
import { useMap, FeatureGroup } from "react-leaflet";
import { useContext, useEffect, useRef } from "react";
import { GeoJSONContext } from "@context/GeoJSONContext";

export const GeoJSONLayer = () => {
  const map = useMap()
  const geojsonRef = useRef<L.FeatureGroup>(null)
  const { geoJSON, mapKey } = useContext(GeoJSONContext)

  useEffect(() => {
    geoJSON && map.fitBounds(geojsonRef.current?.getBounds() as LatLngBounds)
  }, [geoJSON, map])

  return geoJSON && geoJSON.features && (
    <FeatureGroup ref={geojsonRef} key={mapKey}>
      {geoJSON.features.map((item) => <GeoJSON key={item.properties?.uuid} feature={item} />)}
    </FeatureGroup>
  )
};