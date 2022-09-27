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
  title: {
    fontWeight: "bold",
    padding: theme.spacing.xs,
    paddingBottom: 0,
  },
  colorSwatch: {
    boxShadow: "unset"
  }
}))


/**
 * Title of Legend
 * 
 * @returns JSX
 */
const LegendTitle = () => {
  const { classes } = useStyles()

  const settings = useStore(state => state.legendSettings)

  if (!settings.title) return null;

  return <Text className={classes.title} style={{ color: settings.fontColor, fontSize: settings.fontSize }}>{settings.title}</Text>
}


interface LegendWrapperProps extends PropsWithChildren {
  direction: "column" | "row";

  spacing: number
}

/**
 * Wrapper for legend item
 * 
 * @param param LegendWrapperProps 
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
 * Display all legend value and colors
 * 
 * @returns 
 */
const LegendItem = () => {
  const { classes } = useStyles()

  const legends = useStore(state => state.legends)

  const settings = useStore(state => state.legendSettings)

  const getLabelLegend = (item: LegendTypes): string | null => {
    if (item.label) return item.label
  
    if (item.type === "single") return item.value
  
    return `${item.value.min ?? ""} - ${item.value.max ?? ""}`
  }

  return (
    <LegendWrapper spacing={settings.spacing} direction={settings.direction}>
      {legends.filter(item => !item.hidden).map(item => (
        <Group noWrap key={item.uuid}>
          <ColorSwatch
            radius={0}
            color={item.color}
            size={settings.symbolSize}
            classNames={{ shadowOverlay: classes.colorSwatch }} />
          <Text
            size="sm"
            style={{
              flex: 1,
              color: settings.fontColor,
              fontSize: settings.fontSize
            }} >
            {getLabelLegend(item)}
          </Text>
        </Group>
      ))}
    </LegendWrapper>
  )
}


/**
 * Legend Container with drag & drop and resizing feature
 * 
 * @returns 
 */
export const Legend = () => {
  const { classes } = useStyles()

  const settings = useStore(state => state.legendSettings)

  const updateSettings = useStore.getState().updateLegendSettings

  const updatePositions: DraggableEventHandler = (e, data) => {
    updateSettings({ position: { x: data.x, y: data.y } })
  }

  const updateSize: RndResizeCallback = (e, direction, ref) => {
    switch (direction) {
      case "bottomRight":
        updateSettings({ size: { width: ref.offsetWidth, height: ref.offsetHeight } })
        break
      case "right":
        updateSettings({ size: { width: ref.offsetWidth, height: settings.size.height } })
        break
      default:
        updateSettings({ size: { width: settings.size.width, height: ref.offsetHeight } })
        break;
    }
  }

  if (!settings.show) return null;

  return (
    <Rnd
      bounds="parent"
      onResize={updateSize}
      position={settings.position}
      onDragStop={updatePositions}
      className={classes.container}
      default={{ ...settings.position, ...settings.size }}
      style={{ backgroundColor: settings.backgroundColor }}
      size={{
        width: settings.size.width,
        height: settings.size.height
      }}
      enableResizing={{
        bottom: true,
        right: true,
        bottomRight: true
      }}>
      <LegendTitle />
      <LegendItem />
    </Rnd>
  )
}