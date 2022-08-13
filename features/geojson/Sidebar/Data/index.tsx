import dynamic from "next/dynamic";
import { useStore } from "@geojson/store";
import { ImportModal } from "./ImportModal";
import { WelcomeAlert } from "./WelcomeAlert";
import { Divider } from "@components/Divider";

const GeoJSONData = dynamic(() => import("./GeoJSONData"), { ssr: false })

export function Data() {
  const geoJSONKey = useStore(state => state.geoJSONKey)
  const features = useStore(state => state.features)

  return (
    <>
      <ImportModal />
      <Divider />
      {features.length !== 0
        ? <GeoJSONData key={geoJSONKey} />
        : <WelcomeAlert />}
    </>
  );
}