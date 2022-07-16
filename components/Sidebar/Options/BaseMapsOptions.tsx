import { Select } from "@mantine/core";
import { baseMaps } from "@config/baseMaps";
import { ListItem } from "../Common/ListItem";
import { useMapSettingsStore } from "@store/mapSettingsStore";

export function BaseMapsOptions() {
  const baseMap = useMapSettingsStore(state => state.baseMap)
  const setBaseMap = useMapSettingsStore(state => state.setBaseMap)

  const selectBaseMap = (value: string) => {
    const selectedBaseMap = baseMaps.find((item) => item.name === value) || null
    setBaseMap(selectedBaseMap)
  }
  return (
    <ListItem title="Base Maps" description="Select base map from various provider" >
      <Select
        placeholder="Pick one"
        data={baseMaps.map(item => item.name)}
        value={baseMap?.name}
        onChange={selectBaseMap}
      />
    </ListItem>
  );
}