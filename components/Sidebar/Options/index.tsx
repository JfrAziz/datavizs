import { Divider } from "@components/Sidebar/Common/Divider";
import { BaseMapsOptions } from "./BaseMapsOptions";
import { MapsControlOptions } from "./MapsControlOptions";

export function Options() {
  return (
    <div>
      {/* <Divider label="Maps Setting" /> */}
      <MapsControlOptions />
      <BaseMapsOptions />
    </div>
  );
}