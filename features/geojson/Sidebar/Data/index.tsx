import dynamic from "next/dynamic";
import { useStore } from "@geojson/store";
import { ImportModal } from "./ImportModal";
import { WelcomeAlert } from "./WelcomeAlert";
import { Divider } from "@components/Divider";
import { ZustandHydration } from "@components/ZustandHydration";
import { StoreWithPersistMiddleware } from "@lib/hooks/hydration";

const GeoJSONData = dynamic(() => import("./GeoJSONData"), { ssr: false })

export function Data() {
  const features = useStore(state => state.features)

  const geoJSONKey = useStore(state => state.geoJSONKey)

  const columns = useStore(state => state.propertiesKeys)

  return (
    <ZustandHydration store={useStore as StoreWithPersistMiddleware}>
      <ImportModal />
      <Divider />
      {features.length !== 0
        ? <GeoJSONData key={geoJSONKey} features={features} columns={columns} />
        : <WelcomeAlert />}
    </ZustandHydration>
  );
}