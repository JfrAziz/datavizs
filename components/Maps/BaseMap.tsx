import { useId } from "@mantine/hooks";
import { TileLayer } from "react-leaflet";
import { useMapSettingsStore } from "@store/mapSettingsStore";

export const BaseMap = () => {
  const baseMap = useMapSettingsStore(state => state.baseMap)
  const uuid = useId(baseMap?.name);

  if (!baseMap?.attribution) return null;

  return <TileLayer key={uuid} url={baseMap.baseMap} />
};