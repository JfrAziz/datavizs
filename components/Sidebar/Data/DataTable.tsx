import { Trash } from 'tabler-icons-react';
import { useState, useEffect } from "react";
import { useDebouncedValue } from '@mantine/hooks';
import { useGeoJSONStore } from "@store/geoJSONStore";
import { ActionIcon, ColorInput, ScrollArea, Table, TextInput } from '@mantine/core';

interface DataTableRowProps {
  keys: string[] | null;
  properties: any
}

const Row = ({ keys, properties }: DataTableRowProps) => {
  const deleteGeoJSONbyUUID = useGeoJSONStore(state => state.deleteFeaturebyUUID)
  const updateFeatureByUUID = useGeoJSONStore(state => state.updateFeatureByUUID)
  const updateFeatureColor = useGeoJSONStore(state => state.updateFeatureColor)

  const [propertiesValue, setPropertiesValue] = useState(properties)
  const [colorValue, setColorValue] = useState<string>("#C5D899")
  
  const [propertiesDebounce] = useDebouncedValue(propertiesValue, 500);
  const [colorDebounce] = useDebouncedValue(colorValue, 500);

  useEffect(() => {
    updateFeatureByUUID(properties.uuid, propertiesDebounce)
  }, [propertiesDebounce])

  useEffect(() => {
    updateFeatureColor(properties.uuid, colorDebounce)
  }, [colorDebounce])

  return (
    <tr>
      {
        keys && keys.map(keyName =>
          <td key={`${properties?.uuid}_${keyName}`}>
            <TextInput onChange={(e) => setPropertiesValue({ ...properties, [keyName]: e.target.value })} value={propertiesValue?.[keyName]} />
          </td>
        )
      }
      <td>
        <ColorInput value={colorValue} onChange={(value) => setColorValue(value)} />
      </td>
      <td>
        <ActionIcon variant="hover" color="red" onClick={() => deleteGeoJSONbyUUID(properties?.uuid)}>
          <Trash size={16} />
        </ActionIcon>
      </td>
    </tr>
  )
}

export const DataTable = () => {
  const mapKey = useGeoJSONStore(state => state.mapKey)
  const geoJSON = useGeoJSONStore(state => state.geoJSON)

  const features = geoJSON?.features

  if (!features?.length) return null;

  const keys = features[0].properties && Object.keys(features[0].properties).filter(item => item !== "uuid")

  return (
    <ScrollArea key={mapKey}>
      <Table>
        <thead>
          <tr>
            {keys && keys.map(key => <th key={key}>{key}</th>)}
            <th>Colors</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => <Row key={feature?.properties?.uuid} keys={keys} properties={feature.properties} />)}
        </tbody>
      </Table>
    </ScrollArea>
  )
}