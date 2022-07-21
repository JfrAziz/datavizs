import { BaseMapsOptions } from "./BaseMapsOptions";
import { MapsControlOptions } from "./MapsControlOptions";

export function Maps() {
  return (
    <div>
      <MapsControlOptions />
      <BaseMapsOptions />
    </div>
  );
}