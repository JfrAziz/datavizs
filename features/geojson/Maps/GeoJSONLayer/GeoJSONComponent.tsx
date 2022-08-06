import { FeatureExtended } from '@geojson/store/types';
import { geoJSON, FeatureGroup, PathOptions } from "leaflet";
import { createElementObject, createPathComponent, LeafletContextInterface, PathProps, extendContext } from '@react-leaflet/core'

interface GeoJSONProps extends PathProps, React.PropsWithChildren {
  data: FeatureExtended;
}

const createStyles = (color: string) : PathOptions => ({
  fillColor: color,
  weight: 1,
  opacity: 1,
  color: '#888',
  dashArray: '3',
  fillOpacity: 1
})

const createGeoJSON = (props: GeoJSONProps, context: LeafletContextInterface) => {
  const geoJSONObject = geoJSON(props.data, { style: createStyles(props.data.properties.color), })
  return createElementObject(geoJSONObject, extendContext(context, { overlayContainer: geoJSONObject }))
}

const updateGeoJSON = (instance: FeatureGroup, props: GeoJSONProps, prevProps: GeoJSONProps) => {
  if (props.data.properties.color !== prevProps.data.properties.color) {
    instance.setStyle(createStyles(props.data.properties.color))
  }
}

export const GeoJSONComponent = createPathComponent(createGeoJSON, updateGeoJSON)