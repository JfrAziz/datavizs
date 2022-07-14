import { Divider } from "@components/Sidebar/Common/Divider";
import { DataTable } from "./DataTable";
import { ImportOptions } from "./ImportOptions";

export function Data() {
  return (
    <>
      <ImportOptions />
      <Divider />
      <DataTable />
    </>
  );
}