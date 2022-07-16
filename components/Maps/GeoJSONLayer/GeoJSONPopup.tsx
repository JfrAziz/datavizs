import { FC, useState } from 'react';
import { useDebounce } from '@utils/debounce';
import { useGeoJSONStore } from '@store/geoJSONStore';
import { FeatureProperties } from '@utils/featureCollection';
import { Text, Paper, Group, ScrollArea, ColorPicker } from '@mantine/core';

export const GeoJSONPopup: FC<{ properties: FeatureProperties }> = ({ properties }) => {
  const [color, setColor] = useState(properties.color)

  const updateFeatureByUUID = useDebounce(useGeoJSONStore(state => state.updateFeatureByUUID), 500)

  const updateColor = (color: string) => {
    setColor(color)
    updateFeatureByUUID(properties.uuid, { ...properties, color: color })
  }

  const keys = Object.keys(properties).filter(item => item !== "uuid" && item !== "color")
  return keys && (
    <div>
      <Paper withBorder radius="md" p="xs">
        <div style={{ height: "100%", display: "flex", maxHeight: 200 }}>
          <ScrollArea style={{ width: 250 }} scrollbarSize={3}>
            {
              keys.map(key => {
                return (
                  <Group position="apart" noWrap spacing="xl" mb="sm" key={`${properties.uuid}_${key}`}>
                    <div>
                      <Text size="sm">{key}</Text>
                    </div>
                    <div>
                      <Text align='right' size="sm">{properties?.[key]}</Text>
                    </div>
                  </Group>
                )
              })
            }
          </ScrollArea>
        </div>
        <ColorPicker mt={10} value={color} style={{ width: "100%" }} size="md" onChange={updateColor} />
      </Paper>
    </div>
  )
}