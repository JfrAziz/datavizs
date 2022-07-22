import "leaflet/dist/leaflet.css";
import { BaseMap } from "./BaseMap";
// import { MapControl } from "./MapsControl";
import { MapContainer } from "react-leaflet";
import { GeoJSONLayer } from "./GeoJSONLayer";
import { LEAFLET_CUSTOM_COLOR_VAR } from "@config/colors";
import { useMemo } from "react";
import { useStore } from "@stores/maps";

const Map = () => {

  const setMap = useStore.getState().setMap

  const map = useMemo(() => (
    <MapContainer
      zoom={3}
      center={[0, 0]}
      zoomControl={false}
      scrollWheelZoom={false}
      attributionControl={false}
      ref={setMap}
      style={{ height: "100%", width: "100%", zIndex: 0, backgroundColor: `var(${LEAFLET_CUSTOM_COLOR_VAR})` }}
    >
      <BaseMap />
      <GeoJSONLayer />
    </MapContainer>
  ), [])

  return map
}

export default Map;