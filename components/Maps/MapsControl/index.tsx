import { MinimapControl } from "./Minimap";
import { ScaleControl, ZoomControl } from "react-leaflet";
import { useMapStore } from "@store/mapStore";

export const MapControl = () => {
  const showControl = useMapStore(state => state.showControl)
  if (!showControl) return null;

  return (
    <>
      <ScaleControl />
      <ZoomControl position="bottomleft" />
      {/* <MinimapControl position="topright" /> */}
    </>
  )
};