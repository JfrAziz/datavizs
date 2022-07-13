import { useContext } from "react"
import { ScrollArea, Table } from '@mantine/core';
import { GeoJSONContext } from "../Context/GeoJSONContext"

export const DataTable = () => {
  const { geoJSON } = useContext(GeoJSONContext)

  console.log("table rerender")

  const features = geoJSON?.features

  if (!features) return null;

  const keys = features[0].properties && Object.keys(features[0].properties)

  const rows = features.map((element, id) => (
    <tr key={id}>
      <td>{id + 1}</td>
      {keys && keys.map(key => <td key={`${id}_${key}`}>{element?.properties?.[key]}</td>)}
    </tr>
  ));

  return (
    <ScrollArea>
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