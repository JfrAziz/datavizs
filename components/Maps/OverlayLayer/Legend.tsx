import { Rnd } from "react-rnd"
import { useStore } from "@stores/maps"
import { PropsWithChildren } from "react";
import type { Legend as LegendTypes } from "@stores/maps/types"
import { ColorSwatch, createStyles, Group, Stack, Text } from "@mantine/core"


const useStyles = createStyles(theme => ({
  container: {
    zIndex: 1,
    fontSize: theme.fontSizes.sm,
  },
  wrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    padding: 10
  },
  colorSwatch: {
    boxShadow: "unset"
  }
}))


interface LegendWrapperProps extends PropsWithChildren {
  direction: "column" | "row";

  spacing: number
}

/**
 * 
 * @param param0 
 * @returns 
 */
const LegendWrapper = ({ direction, spacing, children }: LegendWrapperProps) => {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      {direction === "row"
        ? <Group spacing={10 + spacing}>{children}</Group>
        : <Stack spacing={spacing}>{children}</Stack>}
    </div>
  )
}

/**
 * return label for each legend
 * 
 * @param item 
 * @returns 
 */
const getLabelLegend = (item: LegendTypes): string | null => {
  if (item.label) return item.label

  if (item.type === "single") return item.value

  return `${item.value.min ?? ""} - ${item.value.max ?? ""}`
}

/**
 * 
 * @returns JSX
 */
export const Legend = () => {
  const { classes } = useStyles()

  const legends = useStore(state => state.legends)
  const legendOptions = useStore(state => state.legendOptions)

  if (!legendOptions.show) return null;

  return (
    <Rnd
      bounds="parent"
      className={classes.container}
      style={{ backgroundColor: legendOptions.backgroundColor }}
      default={{
        x: legendOptions.position.x ?? 0,
        y: legendOptions.position.y ?? 0,
        width: legendOptions.width ?? "auto",
        height: "auto"
      }}
      enableResizing={{
        top: false,
        left: true,
        right: true,
        bottom: false,
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
      }}>
      <LegendWrapper
        direction={legendOptions.direction}
        spacing={legendOptions.spacing}>
        {legends.filter(item => !item.hidden).map(item => (
          <Group noWrap key={item.uuid}>
            <ColorSwatch
              radius={0}
              color={item.color}
              size={legendOptions.symbolSize}
              classNames={{ shadowOverlay: classes.colorSwatch }} />
            <Text
              size="sm"
              style={{
                flex: 1,
                color: legendOptions.textColor,
                fontSize: legendOptions.textSize
              }} >
              {getLabelLegend(item)}
            </Text>
          </Group>
        ))}
      </LegendWrapper>
    </Rnd>
  )
}