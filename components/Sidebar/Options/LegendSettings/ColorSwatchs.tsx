import { Group, ColorSwatch } from "@mantine/core";
import { FeatureColor } from "@utils/featureColor";

export const ColorSwatchs = ({ colors }: { colors: FeatureColor[] }) => (
  <Group position="center" spacing="xs">
    {colors.map((item, idx) => <ColorSwatch key={idx} color={item.color} />)}
  </Group>
)