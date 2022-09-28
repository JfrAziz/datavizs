import dynamic from "next/dynamic";
import { useStore } from "@geojson/store";
import { useEffect, useState } from "react";
import { ImportModal } from "./ImportModal";
import { WelcomeAlert } from "./WelcomeAlert";
import { Divider } from "@components/Divider";

const GeoJSONData = dynamic(() => import("./GeoJSONData"), { ssr: false })

export function Data() {
  const features = useStore(state => state.features)

  const geoJSONKey = useStore(state => state.geoJSONKey)

  const columns = useStore(state => state.propertiesKeys)

  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsubFinishHydration = useStore.persist.onFinishHydration(() => setHydrated(true))

    setHydrated(useStore.persist.hasHydrated())

    return unsubFinishHydration()
  }, [])

  return (
    <>
      <ImportModal />
      <Divider />
      {hydrated && features.length !== 0
        ? <GeoJSONData key={geoJSONKey} features={features} columns={columns} />
        : <WelcomeAlert />}
    </>
  );
}