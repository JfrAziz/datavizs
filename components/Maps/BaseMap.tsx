import { useMemo } from "react";
import { useId } from "@mantine/hooks";
import { useStore } from "@stores/maps";
import { TileLayer } from "react-leaflet";

export const BaseMap = () => {
  const baseMap = useStore(state => state.baseMap)

  const layer = useMemo(() => {
    if (!baseMap) return null;

    return <TileLayer url={baseMap.baseMap} />
  }, [baseMap])

  return layer
};