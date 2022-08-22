import { useState } from "react";
import { useStore } from "@geojson/store";
import { Settings } from "@components/Settings";
import { ColorInput, Group, Select, Text } from "@mantine/core";
import { DEFAULT_BASEMAP_COLOR, LEAFLET_CUSTOM_COLOR_VAR, baseMaps } from "@config/leaflet";
import { Divider } from "@components/Divider";


export function BaseMapsSettings() {
  const baseMap = useStore(state => state.baseMap)
  const setBaseMap = useStore.getState().setBaseMap

  const [color, setColor] = useState(DEFAULT_BASEMAP_COLOR)

  const selectBaseMap = (value: string) => {
    const selectedBaseMap = baseMaps.find((item) => item.name === value) || null
    setBaseMap(selectedBaseMap)
  }

  const setBaseColor = (value: string) => {
    document.documentElement.style.setProperty(LEAFLET_CUSTOM_COLOR_VAR, value);
    setColor(value)
  }

  return (
    <>
      <Settings title="Base Maps" description="Select base map from various provider" >
        <Select
          placeholder="Pick one"
          data={[...baseMaps.map(item => item.name), "No Base Map"]}
          value={baseMap ? baseMap.name : "No Base Map"}
          onChange={selectBaseMap}
        />
      </Settings>
      {!baseMap && (
        <>
          <Group position="apart" mt="lg">
            <div>
              <Text>Background Color</Text>
              <Text size="xs" color="dimmed">Use background color instead?</Text>
            </div>
            <ColorInput defaultValue="#d5e8eb" value={color} onChange={setBaseColor} />
          </Group>
          <Divider />
        </>
      )
      }
    </>
  );
}