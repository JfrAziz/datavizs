import "leaflet/dist/leaflet.css";
import { BaseMap } from "./BaseMap";
import { useStore } from "@geojson/store";
import { MapContainer } from "react-leaflet";
import { GeoJSONLayer } from "./GeoJSONLayer";
import { LEAFLET_CUSTOM_COLOR_VAR } from "@config/colors";

const MapComponent = () => {
  const setMap = useStore.getState().setMapRef
  const mapWrapper = useStore(state => state.mapWrapper)

  return (
    <MapContainer
      zoom={3}
      ref={setMap}
      center={[0, 0]}
      zoomControl={false}
      attributionControl={false}
      scrollWheelZoom={mapWrapper.type === "auto"}
      style={{
        zIndex: 0,
        height: "100%",
        width: "100%",
        backgroundColor: `var(${LEAFLET_CUSTOM_COLOR_VAR})`
      }} >
      <BaseMap />
      <GeoJSONLayer />
    </MapContainer>
  )
}

export default MapComponent;