import { useContext } from "react";
import { Select } from "@mantine/core";
import { ListItem } from "../Common/ListItem";
import { baseMaps } from "@config/baseMaps";
import { BaseMapContext } from "@context/BaseMapContext";

export function BaseMapsOptions() {
  const { baseMap, setBaseMap } = useContext(BaseMapContext)

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