import { MapSettings } from "./Map";
import { useStore } from "@maps/store";
import { GeoJSONSettings } from "./GeoJSON";
import { Divider } from "@components/Divider";
import { ZustandHydration } from "@components/ZustandHydration";
import { StoreWithPersistMiddleware } from "@lib/hooks/hydration";

export const Settings = () => {
  return (
    <ZustandHydration store={useStore as StoreWithPersistMiddleware}>
      <MapSettings />
      <Divider label="Map Opacity and Border" />
      <GeoJSONSettings />
    </ZustandHydration>
  );
}