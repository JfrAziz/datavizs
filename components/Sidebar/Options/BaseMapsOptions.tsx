import { useState } from "react";
import { baseMaps } from "@config/baseMaps";
import { ListItem } from "../Common/ListItem";
import { ColorInput, Select } from "@mantine/core";
import { LEAFLET_CUSTOM_COLOR_VAR } from "@config/colors";
import { useMapSettingsStore } from "@store/mapSettingsStore";


export function BaseMapsOptions() {
  const baseMap = useMapSettingsStore(state => state.baseMap)
  const setBaseMap = useMapSettingsStore(state => state.setBaseMap)

  const [color, setColor] = useState(getComputedStyle(document.documentElement).getPropertyValue(LEAFLET_CUSTOM_COLOR_VAR))

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
      <ListItem title="Base Maps" description="Select base map from various provider" >
        <Select
          placeholder="Pick one"
          data={baseMaps.map(item => item.name)}
          value={baseMap?.name}
          onChange={selectBaseMap}
        />
      </ListItem>
      {
        !(baseMap?.attribution) && (
          <ListItem title="Background Color" description="Use background color instead?" >
            <ColorInput value={color} width="10p%" onChange={setBaseColor} />
          </ListItem>
        )
      }
    </>
  );
}