import { Divider } from "../Sidebar/Divider";
import { DataTable } from "./DataTable";
import { Import } from "./Import";

export function Data() {
  return (
    <>
      <Import />
      <Divider />
      <DataTable />
    </>
  );
}