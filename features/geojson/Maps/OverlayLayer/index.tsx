import { Legend } from "./Legend";
import { Attribution } from "./Attribution";
import { ZustandHydration } from "@components/ZustandHydration";
import { StoreWithPersistMiddleware } from "@lib/hooks/hydration";
import { useStore } from "@geojson/store";

export const OverlayLayer = () => (
  <ZustandHydration store={useStore as StoreWithPersistMiddleware}>
    <Legend />
    <Attribution />
  </ZustandHydration>
)