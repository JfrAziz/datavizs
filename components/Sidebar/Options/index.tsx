import { ColorOptions } from "./LegendSettings";
import { BaseMapsOptions } from "./BaseMapsOptions";
import { MapsControlOptions } from "./MapsControlOptions";
import { Divider } from "@components/Sidebar/Common/Divider";

export function Options() {
  return (
    <div>
      <ColorOptions />

      {/* <Divider label="Maps Setting" /> */}
      <MapsControlOptions />
      <BaseMapsOptions />
    </div>
  );
}