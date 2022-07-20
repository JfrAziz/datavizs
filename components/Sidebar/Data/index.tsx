import dynamic from "next/dynamic";
import { useStore } from "@stores/maps";
import { ImportOptions } from "./ImportOptions";
import { Divider } from "@components/Sidebar/Common/Divider";

const DataTable = dynamic(() => import("./DataTable"), { ssr: false })


export function Data() {
  const mapKey = useStore(state => state.mapKey)
  const features = useStore(state => state.features)

  return (
    <>
      <ImportOptions />
      <Divider />
      {features.length !== 0 && <DataTable key={mapKey} />}
      {/* <DataTable2 /> */}
    </>
  );
}