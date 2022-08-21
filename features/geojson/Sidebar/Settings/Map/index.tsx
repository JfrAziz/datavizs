import { BaseMapsSettings } from "./BaseMaps";
import { MapsSizeSettings } from "./MapsSize";
import { MapControlSettings } from "./Control";

export const MapSettings = () => {
  return (
    <>
      <MapControlSettings />
      <BaseMapsSettings />
      <MapsSizeSettings />
    </>
  );
}