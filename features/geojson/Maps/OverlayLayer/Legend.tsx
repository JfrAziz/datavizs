import { useStore } from "@geojson/store"
import { PropsWithChildren } from "react";
import { Rnd, RndResizeCallback } from "react-rnd"
import { DraggableEventHandler } from "react-draggable";
import type { Legend as LegendTypes } from "@geojson/store/types"
import { ColorSwatch, createStyles, Group, Stack, Text } from "@mantine/core"


const useStyles = createStyles(theme => ({
  container: {
    zIndex: 1,
    border: "2px solid transparent",

    ":hover": {
      border: `2px dashed ${theme.colors.gray[5]}`
    }
  },
  wrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    padding: theme.spacing.xs
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

  const options = useStore(state => state.legendOptions)

  const updateOptions = useStore.getState().updateLegendOptions

  const updatePositions: DraggableEventHandler = (e, data) => {
    updateOptions({ position: { x: data.x, y: data.y } })
  }

  const updateSize: RndResizeCallback = (e, direction, ref) => {
    switch (direction) {
      case "bottomRight":
        updateOptions({ size: { width: ref.offsetWidth, height: ref.offsetHeight } })
        break
      case "right":
        updateOptions({ size: { width: ref.offsetWidth, height: options.size.height } })
        break
      default:
        updateOptions({ size: { width: options.size.width, height: ref.offsetHeight } })
        break;
    }
  }

  if (!options.show) return null;

  return (
    <Rnd
      bounds="parent"
      onResize={updateSize}
      position={options.position}
      onDragStop={updatePositions}
      className={classes.container}
      default={{ ...options.position, ...options.size }}
      style={{ backgroundColor: options.backgroundColor }}
      size={{
        width: options.size.width,
        height: options.size.height
      }}
      enableResizing={{
        bottom: true,
        right: true,
        bottomRight: true
      }}
    >
      <LegendWrapper spacing={options.spacing} direction={options.direction}>
        {legends.filter(item => !item.hidden).map(item => (
          <Group noWrap key={item.uuid}>
            <ColorSwatch
              radius={0}
              color={item.color}
              size={options.symbolSize}
              classNames={{ shadowOverlay: classes.colorSwatch }} />
            <Text
              size="sm"
              style={{
                flex: 1,
                color: options.fontColor,
                fontSize: options.fontSize
              }} >
              {getLabelLegend(item)}
            </Text>
          </Group>
        ))}
      </LegendWrapper>
    </Rnd>
  )
}