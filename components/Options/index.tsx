import { Divider } from "../Sidebar/Divider";
import { BaseMapsOptions } from "./BaseMapsOptions";

export function Options() {
  return (
    <div>
      <Divider label="Maps Setting" />
      <BaseMapsOptions />
    </div>
  );
}