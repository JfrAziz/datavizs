import { createElementObject, createPathComponent, extendContext, LeafletContextInterface, PathProps } from '@react-leaflet/core'
import L, { LatLngTuple, LatLngLiteral, Layer, Path, FeatureGroup } from 'leaflet'

interface SquareProps extends PathProps {
  center: LatLngLiteral | LatLngTuple | [number, number, number];
  size: number;
  num: string
}

let number: number = 1;

function getBounds(props: SquareProps) {
  return L.latLng(props.center).toBounds(props.size)
}

function createSquare(props: SquareProps, context: LeafletContextInterface) {
  console.log("component", props.num)
  console.log("created", number)
  number = number + 1
  const square = new L.Rectangle(getBounds(props))
  return createElementObject(square, extendContext(context, { overlayContainer: square }))
}

function updateSquare(instance: any, props: SquareProps, prevProps: SquareProps) {
  console.log("component", props.num)
  console.log("updated", number)
  number = number + 1
  if (props.center !== prevProps.center || props.size !== prevProps.size) {
    instance.setBounds(getBounds(props))
  }
}

export const Square = createPathComponent(createSquare, updateSquare)


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

function createGeoJSON(props: any, context: LeafletContextInterface) {
  return createElementObject(L.geoJSON(props.data, {
    style: {
      fillColor: colors[Math.floor(14 * Math.random())],
      weight: 1,
      opacity: 1,
      color: '#888',
      dashArray: '3',
      fillOpacity: 0.7
    }
  }), context)
}

function updateGeoJSON(instance: FeatureGroup, props: any, prevProps: any) {
  if (props.data.properties.name !== prevProps.data.properties.name) {
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

export const GeoJSONSingleObject = createPathComponent(createGeoJSON, updateGeoJSON)