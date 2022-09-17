import { MapSettings } from "./Map";
import { GeoJSONSettings } from "./GeoJSON";
import { Divider } from "@components/Divider";

export const Settings = () => {
  return (
    <>
      <MapSettings />
      <Divider label="Map Opacity and Border" />
      <GeoJSONSettings />
    </>
  );
}