import "leaflet/dist/leaflet.css";
import L, { LatLngBounds } from "leaflet";
import { GeoJSON, useMap } from "react-leaflet";
import { useContext, useEffect, useRef } from "react";
import { GeoJSONContext } from "../Context/GeoJSONContext";

export const GeoJSONLayer = () => {
  const map = useMap()
  const geojsonRef = useRef<L.GeoJSON>(null)
  const { geoJSON } = useContext(GeoJSONContext)

  useEffect(() => {
    geoJSON && map.fitBounds(geojsonRef.current?.getBounds() as LatLngBounds)
  }, [geoJSON])

  return geoJSON && <GeoJSON ref={geojsonRef} data={geoJSON} />
};