import dynamic from "next/dynamic";
import { ImportOptions } from "./ImportOptions";
import { useGeoJSONStore } from "@store/geoJSONStore";
import { Divider } from "@components/Sidebar/Common/Divider";

const DataTable = dynamic(() => import("./DataTable"), { ssr: false })


export function Data() {
  const mapKey = useGeoJSONStore(state => state.mapKey)
  const features = useGeoJSONStore(state => state.features)

  return (
    <>
      <ImportOptions />
      <Divider />
      {features.length !== 0 && <DataTable key={mapKey} />}
      {/* <DataTable2 /> */}
    </>
  );
}