import dynamic from "next/dynamic";
import { useStore } from "@geojson/store";
import { Divider } from "@components/Divider";
import { ImportModal } from "./ImportModal";

const DataTable = dynamic(() => import("./DataTable"), { ssr: false })

export function Data() {
  const geoJSONKey = useStore(state => state.geoJSONKey)
  const features = useStore(state => state.features)

  return (
    <>
      <ImportModal />
      <Divider />
      {features.length !== 0 && <DataTable key={geoJSONKey} />}
    </>
  );
}