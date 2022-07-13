import { useContext } from "react"
import { ScrollArea, Table } from '@mantine/core';
import { GeoJSONContext } from "../Context/GeoJSONContext"

export const DataTable = () => {
  const { geoJSON, mapKey } = useContext(GeoJSONContext)

  const features = geoJSON?.features

  if (!features) return null;

  const keys = features[0].properties && Object.keys(features[0].properties)

  const rows = features.map((element, idx) => (
    <tr key={element?.properties?.uuid}>
      <td>{idx + 1}</td>
      {keys && keys.map(key => <td key={`${element?.properties?.uuid}_${key}`}>{element?.properties?.[key]}</td>)}
    </tr>
  ));

  return (
    <ScrollArea key={mapKey}>
      <Table>
        <thead>
          <tr>
            <th>No.</th>
            {keys && keys.map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}