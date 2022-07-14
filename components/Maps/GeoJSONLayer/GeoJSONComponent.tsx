import { Feature } from 'geojson';
import { geoJSON, FeatureGroup as FeatureGroupLeaflet, StyleFunction } from "leaflet";
import { createElementObject, createPathComponent, LeafletContextInterface, PathProps, extendContext } from '@react-leaflet/core'

interface GeoJSONProps extends PathProps, React.PropsWithChildren {
  data: Feature;
}

const createStyles: StyleFunction = () => {
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

  return {
    fillColor: colors[Math.floor(colors.length * Math.random())],
    weight: 1,
    opacity: 1,
    color: '#888',
    dashArray: '3',
    fillOpacity: 0.7
  }
}

const createGeoJSON = (props: GeoJSONProps, context: LeafletContextInterface) => {
  const geoJSONObject = geoJSON(props.data, { style: createStyles() })
  return createElementObject(geoJSONObject, extendContext(context, { overlayContainer: geoJSONObject }))
}

const updateGeoJSON = (instance: FeatureGroupLeaflet, props: GeoJSONProps, prevProps: GeoJSONProps) => {
  if (props.data?.properties !== prevProps.data?.properties) {
    instance.setStyle(createStyles())
  }
}

export const GeoJSONComponent = createPathComponent(createGeoJSON, updateGeoJSON)