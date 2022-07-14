import { useId } from "@mantine/hooks";
import { TileLayer } from "react-leaflet";
import { useBaseMapStore } from "@store/baseMapStore";

export const BaseMap = () => {
  const baseMap = useBaseMapStore(state => state.baseMap)
  const uuid = useId(baseMap?.name);

  if (!baseMap?.attribution) return null;

  return <TileLayer key={uuid} attribution={baseMap.attribution} url={baseMap.baseMap} />
};