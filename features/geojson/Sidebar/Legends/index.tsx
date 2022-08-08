import { LegendList } from "./LegendList";
import { LegendSettings } from "./Settings";
import { Divider } from "@components/Divider";

export function LegendOptions() {
  return (
    <div>
      <LegendSettings />
      <Divider label="Legend Value & Color Generator" />
      <LegendList />
    </div>
  );
}