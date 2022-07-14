import { useContext } from "react";
import { useId } from "@mantine/hooks";
import { TileLayer } from "react-leaflet";
import { BaseMapContext } from "@context/BaseMapContext";

export const BaseMap = () => {
  const { baseMap } = useContext(BaseMapContext)
  const uuid = useId(baseMap?.name);

  if (!baseMap?.attribution) return null;

  return <TileLayer key={uuid} attribution={baseMap.attribution} url={baseMap.baseMap} />
};