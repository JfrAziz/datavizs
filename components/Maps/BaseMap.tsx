import { useContext } from "react";
import { useId } from "@mantine/hooks";
import { TileLayer } from "react-leaflet";
import { BaseMapContext } from "../Context/BaseMapContext";

export const BaseMap = () => {
  const { baseMap } = useContext(BaseMapContext)

  if (!baseMap?.attribution) return null;

  return <TileLayer key={useId(baseMap.name)} attribution={baseMap.attribution} url={baseMap.baseMap} />
};