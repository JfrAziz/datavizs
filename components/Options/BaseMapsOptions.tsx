import { Select } from "@mantine/core";
import { useContext } from "react";
import { baseMaps } from "../../config/baseMaps";
import { BaseMapContext } from "../Context/BaseMapContext";
import { ListItem } from "../Sidebar/ListItem";


export function BaseMapsOptions() {
  const { baseMap, setBaseMap } = useContext(BaseMapContext)

  const selectBaseMap = (value: string) => {
    const selectedBaseMap = baseMaps.find((item) => item.name === value) || null
    console.log(selectedBaseMap)
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