import { MinimapControl } from "./Minimap";
import { AttributionControl, ScaleControl, ZoomControl } from "react-leaflet";
import { Control } from "leaflet"
import { useMapSettingsStore } from "@store/mapSettingsStore";
import { useEffect, useRef } from "react";

export const MapControl = () => {
  const attrControl = useRef<Control.Attribution>(null)
  const showControl = useMapSettingsStore(state => state.showControl)
  if (!showControl) return null;

  useEffect(() => {
    attrControl && attrControl.current?.addAttribution("teststefasdasdkjasd")
  }, [attrControl])
  

  return (
    <>
      <ScaleControl />
      <ZoomControl position="bottomleft" />
      <AttributionControl ref={attrControl} prefix="" position="topleft" />
      {/* <MinimapControl position="topright" /> */}
    </>
  )
};