import { useContext } from "react"
import { Button, ScrollArea, Table } from '@mantine/core';
import { GeoJSONContext } from "../../Context/GeoJSONContext"
import { Feature } from "geojson";

interface DataTableRowProps {
  keys: string[] | null,
  features: Feature[]
}

const DataTableRow = ({ keys, features }: DataTableRowProps) => {
  return (
    <>
      {
        features.map((element, idx) => (
          <tr key={element?.properties?.uuid}>
            <td>{idx + 1}</td>
            {keys && keys.map(key => <td key={`${element?.properties?.uuid}_${key}`}>{element?.properties?.[key]}</td>)}
          </tr>
        ))
      }
    </>
  )
}

export const DataTable = () => {
  const { geoJSON, mapKey, deleteGeoJSONFirtsIndex } = useContext(GeoJSONContext)

  const features = geoJSON?.features

  if (!features) return null;

  // get all properties key to show on table, except uuid
  const keys = features[0].properties && Object.keys(features[0].properties).filter(item => item !== "uuid")

  return (
    <>
      <Button onClick={() => deleteGeoJSONFirtsIndex()}>
        Delete
      </Button>
      <ScrollArea key={mapKey}>
        <Table>
          <thead>
            <tr>
              <th>No.</th>
              {keys && keys.map(key => <th key={key}>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            <DataTableRow keys={keys} features={features} />
          </tbody>
        </Table>
      </ScrollArea>
    </>
  )
}