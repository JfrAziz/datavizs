import { LegendList } from "./LegendList";
import { ColorSwatchs } from "./ColorSwatchs";
import { FooterButton, HeaderButton } from "./Controls";

export function LegendOptions() {
  return (
    <div>
      <HeaderButton />
      <ColorSwatchs />
      <LegendList />
      <FooterButton />
    </div>
  );
}