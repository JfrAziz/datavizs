import { ScaleControl, ZoomControl } from "react-leaflet";
import { useMapSettingsStore } from "@store/mapSettingsStore";

export const MapControl = () => {
  const showControl = useMapSettingsStore(state => state.showControl)

  if (!showControl) return null;

  return (
    <>
      <ZoomControl />
      <ScaleControl />
    </>
  )
};