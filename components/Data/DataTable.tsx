import { useContext } from "react"
import { Group, ScrollArea, Table } from '@mantine/core';
import { FeatureCollection } from "geojson"
import { GeoJSONContext } from "../Context/GeoJSONContext"

export const DataTable = () => {
  const { geoJSON } = useContext(GeoJSONContext)

  const features = (geoJSON as FeatureCollection)?.features

  if (!features) return null;

  const keys = features[0].properties && Object.keys(features[0].properties)

  const rows = features.map((element, id) => (
    <tr key={id}>
      {keys && keys.map(key => <td key={`${id}_${key}`}>{element?.properties?.[key]}</td>)}
    </tr>
  ));

  return (
    <ScrollArea>
      <Table>
        <thead>
          <tr>
            {keys && keys.map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}