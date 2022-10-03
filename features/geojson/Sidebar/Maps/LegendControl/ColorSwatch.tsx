import { useStore } from "@maps/store"
import { ColorSwatch, Group } from "@mantine/core"

/**
 * Color swatch to display all colors in legends
 * 
 * @returns JSX
 */
export const ColorSwatchs = () => {
  const legends = useStore(state => state.legends)

  return (
    <Group position="center" spacing="xs" mt={20} mb={10}>
      {legends.map((legend, idx) => <ColorSwatch key={idx} color={legend.color} />)}
    </Group>
  )
}