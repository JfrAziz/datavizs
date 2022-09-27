import { LegendKey } from "./LegendKey";
import { LegendList } from "./LegendList";
import { LegendSettings } from "./Settings";
import { ColorSwatchs } from "./ColorSwatch";
import { Divider } from "@components/Divider";
import { LegendHeader } from "./LegendHeader";
import { ProportionalCircle } from "./ProportionalCircle";

export function LegendControl() {
  return (
    <>
      <LegendKey />
      <LegendSettings />
      <ProportionalCircle />
      <Divider />
      <LegendHeader />
      <ColorSwatchs />
      <LegendList />
    </>
  );
}