import { useStore } from "@stores/maps";
import { Group, ColorSwatch } from "@mantine/core";

export const ColorSwatchs = () => {
  const legends = useStore(state => state.legends)
  
  return (
    <Group position="center" spacing="xs">
      {legends.map((legend, idx) => <ColorSwatch key={idx} color={legend.color} />)}
    </Group>
  )
}