import "leaflet/dist/leaflet.css";
import { BaseMap } from "./BaseMap";
import { MapControl } from "./MapsControl";
import { MapContainer } from "react-leaflet";
import { GeoJSONLayer } from "./GeoJSONLayer";
import { LEAFLET_CUSTOM_COLOR_VAR } from "@config/colors";


const Map = () => {
  return (
    <MapContainer
      zoom={3}
      center={[0, 0]}
      zoomControl={false}
      scrollWheelZoom={true}
      attributionControl={false}
      style={{ height: "100%", width: "100%", zIndex: 0, backgroundColor: `var(${LEAFLET_CUSTOM_COLOR_VAR})` }}
    >
      {/* <MapControl /> */}
      <BaseMap />
      <GeoJSONLayer />
    </MapContainer>
  )
}

export default Map;