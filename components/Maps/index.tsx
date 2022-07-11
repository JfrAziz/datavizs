import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import BaseMap from "./BaseMap";
import MapControl from "./MapsControl";
import { useContext } from "react";
import { GeoJSONContext } from "../Context/GeoJSONContext";
import { GeoJsonObject } from "geojson";

const Map = () => {
  const { geoJSON } = useContext(GeoJSONContext)
  return (
    <MapContainer
      zoomControl={false}
      center={[40.8054, -74.0241]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" , zIndex: 0}}>
      <MapControl />
      <BaseMap />

      { 
        geoJSON && (
          <GeoJSON data={geoJSON as unknown as GeoJsonObject} />
        )
      }

    </MapContainer>
  );
};

export default Map;