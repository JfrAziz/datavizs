import { FC } from 'react';
import { FeatureProperties } from '@utils/featureCollection';
import { Text, Paper, Group, ScrollArea } from '@mantine/core';

export const GeoJSONPopup: FC<{ properties: FeatureProperties }> = ({ properties }) => {
  const keys = Object.keys(properties).filter(item => item !== "uuid")
  return keys && (
    <Paper withBorder radius="md" p="xs" style={{ height: "100%", display: "flex", maxHeight: 200 }}>
      <ScrollArea style={{ width: 200 }}>
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
    </Paper>
  )
}