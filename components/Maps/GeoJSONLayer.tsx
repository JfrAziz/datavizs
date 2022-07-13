import "leaflet/dist/leaflet.css";
import L, { LatLngBounds, Layer } from "leaflet";
import { GeoJSON, useMap } from "react-leaflet";
import { useContext, useEffect, useRef } from "react";
import { GeoJSONContext } from "../Context/GeoJSONContext";
import { Feature, GeometryObject } from 'geojson';

const colors = [
  '#fffddd',
  '#faf3c8',
  '#f6e8b3',
  '#f4dd9f',
  '#f3d18b',
  '#f2c578',
  '#f2b866',
  '#f2ab55',
  '#f39d46',
  '#f38e38',
  '#f47d2c',
  '#f56b23',
  '#f6571d',
  '#f63c1a',
  '#f6081b'
]


export const GeoJSONLayer = () => {
  const map = useMap()
  const geojsonRef = useRef<L.GeoJSON>(null)
  const { geoJSON, key } = useContext(GeoJSONContext)

  console.log("element mount")

  useEffect(() => {
    console.log("effect geoJSON")
    geoJSON && map.fitBounds(geojsonRef.current?.getBounds() as LatLngBounds)
  }, [geoJSON])

  function style(feature: Feature<GeometryObject, any> | undefined) {
    return {
      fillColor: colors[Math.floor(14 * Math.random())],
      weight: 1,
      opacity: 1,
      color: '#888',
      dashArray: '3',
      fillOpacity: 0.7
    }
  }

  function onEachFeature(feature: Feature, layer: Layer) {
    layer.on('mouseover', function (e) {

      if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
        layer.openPopup()
      }
    });
    layer.on('mouseout', () => layer.closePopup());
  }

  return geoJSON && <GeoJSON key={key} ref={geojsonRef} data={geoJSON} style={style} onEachFeature={onEachFeature} />
};