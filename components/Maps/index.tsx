import dynamic from "next/dynamic";
import { MapWrapper } from "./MapWrapper";
import { AttributionLayer } from "./OverlayLayer/AttributionLayer";

const MapWithNoSSR = dynamic(() => import("@components/Maps/MapComponent"), { ssr: false });

const Maps = () => (
  <MapWrapper>
    <AttributionLayer />
    <MapWithNoSSR />
  </MapWrapper>
)

export default Maps;