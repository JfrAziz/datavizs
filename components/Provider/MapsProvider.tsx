import React from "react";
import { BaseMapProvider } from "../Context/BaseMapContext";
import { MapSettingsProvider } from "../Context/MapSettingsContext";

export function MapsProvider(props: React.PropsWithChildren) {
  return (
    <MapSettingsProvider>
      <BaseMapProvider>
        {props.children}
      </BaseMapProvider>
    </MapSettingsProvider>
  )
}