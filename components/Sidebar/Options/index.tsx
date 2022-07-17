import { Divider } from "@components/Sidebar/Common/Divider";
import { BaseMapsOptions } from "./BaseMapsOptions";
import { ColorOptions } from "./ColorOptions";
import { MapsControlOptions } from "./MapsControlOptions";

export function Options() {
  return (
    <div>
      <ColorOptions />

      <Divider label="Maps Setting" />
      <MapsControlOptions />
      <BaseMapsOptions />
    </div>
  );
}