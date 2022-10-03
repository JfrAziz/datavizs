import dynamic from "next/dynamic";
import { MapWrapper } from "./MapWrapper";
import { OverlayLayer } from "./OverlayLayer";

const MapWithNoSSR = dynamic(() => import("features/maps/Maps/MapComponent"), { ssr: false });

const Maps = () => (
  <MapWrapper>
    <OverlayLayer />
    <MapWithNoSSR />
  </MapWrapper>
)

export default Maps;