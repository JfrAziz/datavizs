import { useContext } from "react";
import { ScaleControl, ZoomControl } from "react-leaflet";
import { MapSettingsContext } from "../Context/MapSettingsContext";

export const MapControl = () => {
  const { showControl } = useContext(MapSettingsContext)

  if (!showControl) return null;

  return (
    <>
      <ZoomControl />
      <ScaleControl />
    </>
  )
};