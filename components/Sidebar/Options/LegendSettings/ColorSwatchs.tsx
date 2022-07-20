import { Group, ColorSwatch } from "@mantine/core";

export const ColorSwatchs = ({ colors }: { colors: string[] }) => (
  <Group position="center" spacing="xs">
    {colors.map((color, idx) => <ColorSwatch key={idx} color={color} />)}
  </Group>
)