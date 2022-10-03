import { LatLng } from 'leaflet';
import { useStore } from '@maps/store';
import { Focus2 } from 'tabler-icons-react';
import { Divider } from '@components/Divider';
import { FC, useEffect, useState } from 'react';
import { useDebounce } from '@lib/hooks/debounce';
import { FeatureExtended } from '@maps/store/types';
import { Text, Paper, Group, ScrollArea, ColorPicker, ActionIcon } from '@mantine/core';

interface GeoJSONPopupProps {
  latLng: LatLng

  feature: FeatureExtended
}

export const GeoJSONPopup: FC<GeoJSONPopupProps> = ({ feature, latLng }) => {
  const [color, setColor] = useState(feature.properties.color)

  const keys = Object.keys(feature.properties).filter(item => item !== "color")
  
  const updateProperties = useDebounce(useStore.getState().updateFeatureProperties, 200)
  
  const updateColor = (color: string) => {
    setColor(color)
    
    updateProperties(feature.uuid, { ...feature.properties, color: color })
  }
  
  const updatePoint = () => useStore.getState().updatePointCoordinate(feature.uuid, latLng.lat, latLng.lng)
  
  useEffect(() => setColor(feature.properties.color), [feature.properties.color])

  return (
    <Paper withBorder radius="md" p="xs">
      <div style={{ height: "100%", display: "flex", maxHeight: 200 }}>
        <ScrollArea style={{ width: 250 }} scrollbarSize={3}>
          {keys.map(key => (
            <Group position="apart" noWrap spacing="xl" mb="sm" key={`${feature.uuid}_${key}`}>
              <Text size="xs">{key}</Text>
              <Text align='right' size="xs">{feature.properties?.[key]}</Text>
            </Group>
          ))}
        </ScrollArea>
      </div>
      <Divider mt={0} />
      <Group position='apart'>
        <Text size="xs">Set this point as center coordinates</Text>
        <ActionIcon size="sm" variant='filled' color="teal" onClick={updatePoint} >
          <Focus2 size={16} />
        </ActionIcon>
      </Group>
      <ColorPicker format="rgba" mt={10} value={color} style={{ width: "100%" }} size="sm" onChange={updateColor} />
    </Paper>
  )
}