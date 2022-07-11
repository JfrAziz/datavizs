import { useContext } from "react";
import { ScaleControl, ZoomControl } from "react-leaflet";
import { MapSettingsContext } from "../Context/MapSettingsContext";

const MapControl = () => {
  const { showControl } = useContext(MapSettingsContext)
  return (
    <>
      {
        showControl && (
          <>
            <ZoomControl />
            <ScaleControl />
          </>
        )
      }
    </>
  );
};

export default MapControl;