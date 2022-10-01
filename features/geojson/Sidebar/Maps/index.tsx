import { useStore } from "@geojson/store";
import { Divider } from "@components/Divider";
import { LabelControl } from "./LabelControl";
import { LegendControl } from "./LegendControl";
import { ZustandHydration } from "@components/ZustandHydration";
import { StoreWithPersistMiddleware } from "@lib/hooks/hydration";

export function Maps() {
  return (
    <ZustandHydration store={useStore as StoreWithPersistMiddleware}>
      <LabelControl/>
      <Divider label="Legend and Color Generator" />
      <LegendControl />
    </ZustandHydration>
  );
}