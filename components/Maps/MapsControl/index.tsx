import { MinimapControl } from "./Minimap";
import { ScaleControl, ZoomControl } from "react-leaflet";
import { useMapSettingsStore } from "@store/mapSettingsStore";

export const MapControl = () => {
  const showControl = useMapSettingsStore(state => state.showControl)
  if (!showControl) return null;

  return (
    <>
      <ScaleControl />
      <ZoomControl position="bottomleft" />
      <MinimapControl position="topright" />
    </>
  )
};