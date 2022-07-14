import { FC } from "react"
import { useGeoJSONStore } from "@store/geoJSONStore";
import { Button, ScrollArea, Table } from '@mantine/core';

const Row: FC<{ keys: string[] | null, properties: any }> = ({ keys, properties }) => (
  <tr key={properties?.uuid}>
    {keys && keys.map(key => <td key={`${properties?.uuid}_${key}`}>{properties?.[key]}</td>)}
  </tr>
)

export const DataTable = () => {
  const mapKey = useGeoJSONStore(state => state.mapKey)
  const geoJSON = useGeoJSONStore(state => state.geoJSON)
  const deleteGeoJSONFirtsIndex = useGeoJSONStore(state => state.deleteGeoJSONFirtsIndex)

  const features = geoJSON?.features

  if (!features) return null;

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
            {
              features.map((feature) => <Row key={feature?.properties?.uuid} keys={keys} properties={feature.properties} />)
            }
          </tbody>
        </Table>
      </ScrollArea>
    </>
  )
}