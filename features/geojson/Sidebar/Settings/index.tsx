import { MapSettings } from "./Map";
import { GeoJSONSettings } from "./GeoJSON";
import { Divider } from "@components/Divider";
import { MapControlSettings } from "./Control";

export const Settings = () => {
  return (
    <>
      <MapControlSettings />
      <MapSettings />
      <Divider label="Map Opacity and Border" />
      <GeoJSONSettings />
    </>
  );
}