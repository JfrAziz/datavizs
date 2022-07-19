import { useMemo } from "react";
import { useId } from "@mantine/hooks";
import { TileLayer } from "react-leaflet";
import { useMapStore } from "@store/mapStore";

export const BaseMap = () => {
  const baseMap = useMapStore(state => state.baseMap)
  const uuid = useId(baseMap?.name);

  const layer = useMemo(() => {
    if (!baseMap) return null;

    return <TileLayer key={uuid} url={baseMap.baseMap} />
  }, [baseMap])

  return layer
};