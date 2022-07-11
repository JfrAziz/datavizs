import React, { createContext, useState } from "react";

interface MapSettingsContextValue {
  showControl: boolean;
  toggleControl: () => void
}

const mapSettingsInitialState: MapSettingsContextValue = {
  showControl: true,
  toggleControl: () => { }
}

export const MapSettingsContext = createContext<MapSettingsContextValue>(mapSettingsInitialState)

export function MapSettingsProvider(props: React.PropsWithChildren) {
  const [showControl, setShowControl] = useState(mapSettingsInitialState.showControl)

  const toggleControl = () => {
    setShowControl(!showControl)
  }

  return (
    <MapSettingsContext.Provider value={{ showControl, toggleControl }}>
      {props.children}
    </MapSettingsContext.Provider>
  )
}