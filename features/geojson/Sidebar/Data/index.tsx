import dynamic from "next/dynamic";
import { useStore } from "@geojson/store";
import { ImportGeoJSON } from "./Import";
import { Divider } from "@components/Divider";

const DataTable = dynamic(() => import("./DataTable"), { ssr: false })


export function Data() {
  const geoJSONKey = useStore(state => state.geoJSONKey)
  const features = useStore(state => state.features)

  return (
    <>
      <ImportGeoJSON />
      <Divider />
      {features.length !== 0 && <DataTable key={geoJSONKey} />}
    </>
  );
}