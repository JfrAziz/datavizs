import { useId } from "@mantine/hooks";
import { TileLayer } from "react-leaflet";
import { useMapStore } from "@store/mapStore";

export const BaseMap = () => {
  const baseMap = useMapStore(state => state.baseMap)
  const uuid = useId(baseMap?.name);

  if (!baseMap?.attribution) return null;

  return <TileLayer key={uuid} url={baseMap.baseMap} />
};