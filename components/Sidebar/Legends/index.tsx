import { Divider } from "../Common/Divider";
import { ShowLegend } from "./Controls";
import { LegendList } from "./LegendList";

export function LegendOptions() {
  return (
    <div>
      <ShowLegend />
      <Divider label="Legend Value & Color Generator" />
      <LegendList />
    </div>
  );
}