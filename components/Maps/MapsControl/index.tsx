import { useStore } from "@stores/maps";
import { MinimapControl } from "./Minimap";
import { ScaleControl, ZoomControl } from "react-leaflet";

export const MapControl = () => {
  const showControl = useStore(state => state.showControl)
  if (!showControl) return null;

  return (
    <>
      <ScaleControl />
      <ZoomControl position="bottomleft" />
      {/* <MinimapControl position="topright" /> */}
    </>
  )
};