import { useState } from "react";
import { useStore } from "@stores/maps";
import { baseMaps } from "@config/maps";
import { ColorInput, Select } from "@mantine/core";
import { Options } from "@components/Common/Options";
import { DEFAULT_BASEMAP_COLOR, LEAFLET_CUSTOM_COLOR_VAR } from "@config/colors";


export function BaseMapsOptions() {
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
      <Options title="Base Maps" description="Select base map from various provider" >
        <Select
          placeholder="Pick one"
          data={[...baseMaps.map(item => item.name), "No Base Map"]}
          value={baseMap ? baseMap.name : "No Base Map"}
          onChange={selectBaseMap}
        />
      </Options>
      {
        !baseMap && (
          <Options title="Background Color" description="Use background color instead?" >
            <ColorInput defaultValue="#d5e8eb" value={color} onChange={setBaseColor} />
          </Options>
        )
      }
    </>
  );
}