import { useStore } from "@stores/maps"
import type { Legend as LegendTypes } from "@stores/maps/types"
import { ColorSwatch, createStyles, Group, Stack, Text } from "@mantine/core"
import { PropsWithChildren } from "react";

const useStyles = createStyles(theme => ({
  container: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "white",
    zIndex: 3,
    padding: 10,
    fontSize: theme.fontSizes.sm,
  }
}))


interface LegendWrapperProps extends PropsWithChildren {
  direction: "column" | "row";

  background: string

  spacing: number
}

/**
 * 
 * @param param0 
 * @returns 
 */
const LegendWrapper = ({ direction, background, spacing, children }: LegendWrapperProps) => {
  return (
    <div style={{ backgroundColor: background }}>
      {direction === "row"
        ? <Group spacing={spacing}>{children}</Group>
        : <Stack spacing={spacing}>{children}</Stack>}
    </div>
  )
}

export const Legend = () => {
  const { classes } = useStyles()

  const legends = useStore(state => state.legends)
  const legendOptions = useStore(state => state.legendOptions)

  const getLabelLegend = (item: LegendTypes): string | null => {
    if (item.label) return item.label

    if (item.type === "single") return item.value

    return `${item.value.min ?? ""} - ${item.value.max ?? ""}`

  }

  if (!legendOptions.show) return null;

  return (
    <div className={classes.container}>
      <LegendWrapper direction={legendOptions.direction} background="#FFF" spacing={0}>
        {legends.filter(item => !item.hidden).map(item => (
          <Group key={item.uuid} noWrap position="apart">
            <ColorSwatch color={item.color} radius={0} styles={{ shadowOverlay: { boxShadow: "unset" } }} />
            <Text size="sm" >{getLabelLegend(item)}</Text>
          </Group>
        ))}
      </LegendWrapper>
    </div>
  )
}