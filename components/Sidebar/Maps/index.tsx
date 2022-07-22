import { BaseMapsOptions } from "./BaseMapsOptions";
import { MapsSizeOptions } from "./MapsSizeOptions";
import { MapsControlOptions } from "./MapsControlOptions";

export function Maps() {
  return (
    <div>
      <MapsControlOptions />
      <BaseMapsOptions />
      <MapsSizeOptions />
    </div>
  );
}