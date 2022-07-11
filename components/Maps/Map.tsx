import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import BaseMap from "./BaseMap";

const Map = () => {
  return (
    <MapContainer zoomControl={false} center={[40.8054, -74.0241]} zoom={5} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
      <BaseMap />
    </MapContainer>
  );
};

export default Map;