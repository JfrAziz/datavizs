import { Feature } from 'geojson';
import { useMap, FeatureGroup } from "react-leaflet";
import { useContext, useEffect, useRef } from "react";
import { GeoJSONContext } from "../Context/GeoJSONContext";
import { geoJSON, LatLngBounds, Layer, FeatureGroup as FeatureGroupLeaflet } from "leaflet";
import { createElementObject, createPathComponent, LeafletContextInterface, PathProps } from '@react-leaflet/core'

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

interface GeoJSONProps extends PathProps {
  data: Feature
}

function createGeoJSON(props: GeoJSONProps, context: LeafletContextInterface) {
  return createElementObject(geoJSON(props.data, {
    style: {
      fillColor: colors[Math.floor(14 * Math.random())],
      weight: 1,
      opacity: 1,
      color: '#888',
      dashArray: '3',
      fillOpacity: 0.7
    },
    onEachFeature: (feature: Feature, layer: Layer) => {
      layer.on('mouseover', function (e) {

        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
          layer.openPopup()
        }
      });
      layer.on('mouseout', () => layer.closePopup());
    }
  }), context)
}

function updateGeoJSON(instance: FeatureGroupLeaflet, props: GeoJSONProps, prevProps: GeoJSONProps) {
  if (props.data?.properties?.uuid !== prevProps.data?.properties?.uuid) {
    console.log("updated")
    instance.setStyle({
      fillColor: colors[Math.floor(14 * Math.random())],
      weight: 1,
      opacity: 1,
      color: '#888',
      dashArray: '3',
      fillOpacity: 0.7
    })
  }
}

const GeoJSON = createPathComponent(createGeoJSON, updateGeoJSON)

export const GeoJSONLayer = () => {
  const map = useMap()
  const { geoJSON, mapKey } = useContext(GeoJSONContext)
  const geojsonRef = useRef<L.FeatureGroup>(null)

  useEffect(() => {
    console.log("asdasd")
    geoJSON && map.fitBounds(geojsonRef.current?.getBounds() as LatLngBounds)
  }, [geoJSON, map])

  return geoJSON && geoJSON.features && (
    <FeatureGroup ref={geojsonRef} key={mapKey}>
      {geoJSON.features.map((item) => <GeoJSON key={item.properties?.uuid} data={item} />)}
    </FeatureGroup>
  )
};