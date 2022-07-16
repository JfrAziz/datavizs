import { Trash } from 'tabler-icons-react';
import { useState } from "react";
import { useGeoJSONStore } from "@store/geoJSONStore";
import { ActionIcon, ColorInput, TextInput } from '@mantine/core';

interface DataTableRowProps {
  keys: string[] | null;
  properties: any;
  updateRow: (uuid: string, properties: any) => void;
  updateRowColor: (uuid: string, color: string) => void;
}

export const Row = ({ keys, properties, updateRow, updateRowColor }: DataTableRowProps) => {
  const [colorValue, setColorValue] = useState<string>("#123456")
  const [propertiesValue, setPropertiesValue] = useState(properties)

  const deleteGeoJSONbyUUID = useGeoJSONStore(state => state.deleteFeaturebyUUID)

  const updateColor = (value: string) => {
    setColorValue(value)
    updateRowColor(properties.uuid, value)
  }

  const updateProperties = (properties: any) => {
    setPropertiesValue(properties)
    updateRow(properties.uuid, properties)
  }

  return (
    <tr>
      {
        keys && keys.map(keyName =>
          <td key={`${properties?.uuid}_${keyName}`}>
            <TextInput value={propertiesValue?.[keyName]} onChange={(e) => updateProperties({ ...properties, [keyName]: e.target.value })} />
          </td>
        )
      }
      <td>
        <ColorInput value={colorValue} defaultValue={colorValue} onChange={updateColor}  />
      </td>
      <td>
        <ActionIcon variant="hover" color="red" onClick={() => deleteGeoJSONbyUUID(properties?.uuid)}>
          <Trash size={16} />
        </ActionIcon>
      </td>
    </tr>
  )
}