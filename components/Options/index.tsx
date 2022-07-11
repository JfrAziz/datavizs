import { Divider } from "../Sidebar/Divider";
import { BaseMapsOptions } from "./BaseMapsOptions";
import { MapsControlOptions } from "./MapsControlOptions";

export function Options() {
  return (
    <div>
      <Divider label="Maps Setting" />
      <MapsControlOptions />
      <BaseMapsOptions />
    </div>
  );
}