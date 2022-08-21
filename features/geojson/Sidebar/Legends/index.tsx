import { LegendList } from "./List";
import { LegendSettings } from "./Settings";
import { ColorSwatchs } from "./ColorSwatch";
import { Divider } from "@components/Divider";
import { LegendListHeader } from "./ListHeader";
import { AssociatedKey } from "./AssociatedKey";
import { ProportionalCircleSettings } from "./ProportionalCircle";

export function LegendOptions() {
  return (
    <div>
      <AssociatedKey />
      <LegendSettings />
      <ProportionalCircleSettings />
      <Divider />
      <LegendListHeader />
      <ColorSwatchs />
      <LegendList />
    </div>
  );
}