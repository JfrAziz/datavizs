import { Divider } from "@components/Divider";
import { LabelControl } from "./LabelControl";
import { LegendControl } from "./LegendControl";

export function Maps() {
  return (
    <>
      <LabelControl/>
      <Divider label="Legend and Color Generator" />
      <LegendControl />
    </>
  );
}