import { FC, useState } from 'react';
import { FeatureProperties } from '@stores/maps/types';
import { Text, Paper, Group, ScrollArea, ColorPicker } from '@mantine/core';

interface GeoJSONPopupProps {
  properties: FeatureProperties
  updateProperties: (uuid: string, properties: FeatureProperties) => void
}

export const GeoJSONPopup: FC<GeoJSONPopupProps> = ({ properties, updateProperties }) => {
  const [color, setColor] = useState(properties.color)

  const keys = Object.keys(properties).filter(item => item !== "uuid" && item !== "color")

  const updateColor = (color: string) => {
    setColor(color)
    updateProperties(properties.uuid, { ...properties, color: color })
  }
  
  return (
    <Paper withBorder radius="md" p="xs">
      <div style={{ height: "100%", display: "flex", maxHeight: 200 }}>
        <ScrollArea style={{ width: 250 }} scrollbarSize={3}>
          {keys.map(key => (
            <Group position="apart" noWrap spacing="xl" mb="sm" key={`${properties.uuid}_${key}`}>
              <Text size="sm">{key}</Text>
              <Text align='right' size="sm">{properties?.[key]}</Text>
            </Group>
          ))}
        </ScrollArea>
      </div>
      <ColorPicker format="rgba" mt={10} value={color} style={{ width: "100%" }} size="md" onChange={updateColor} />
    </Paper>
  )
}