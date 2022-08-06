import { ShowLegend } from "./Controls";
import { LegendList } from "./LegendList";
import { Divider } from "@components/Common/Divider";

export function LegendOptions() {
  return (
    <div>
      <ShowLegend />
      <Divider label="Legend Value & Color Generator" />
      <LegendList />
    </div>
  );
}