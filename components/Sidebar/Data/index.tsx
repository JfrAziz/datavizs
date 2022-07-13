import { Divider } from "../Items/Divider";
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