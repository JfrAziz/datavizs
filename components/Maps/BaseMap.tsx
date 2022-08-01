import { useMemo } from "react";
import { useId } from "@mantine/hooks";
import { useStore } from "@stores/maps";
import { TileLayer } from "react-leaflet";

export const BaseMap = () => {
  const baseMap = useStore(state => state.baseMap)
  const uuid = useId(baseMap?.name ?? "no-basemap")

  const layer = useMemo(() => {
    if (!baseMap) return null;

    return <TileLayer key={uuid} url={baseMap.baseMap} />
  }, [baseMap, uuid])

  return layer
};