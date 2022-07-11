import "leaflet/dist/leaflet.css";
import { BaseMap } from "./BaseMap";
import { MapControl } from "./MapsControl";
import { MapContainer } from "react-leaflet";
import { GeoJSONLayer } from "./GeoJSONLayer";

const Map = () => (
  <MapContainer
    zoomControl={false}
    center={[0, 0]}
    zoom={3}
    scrollWheelZoom={true}
    style={{ height: "100%", width: "100%", zIndex: 0 }}>
    <MapControl />
    <BaseMap />
    <GeoJSONLayer />
  </MapContainer>
)

export default Map;