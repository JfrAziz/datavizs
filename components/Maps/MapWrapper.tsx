import { useStore } from "@stores/maps"
import { PropsWithChildren } from "react"
import { ExternalControl } from "./ExternalControl";
import { createStyles, Paper, ScrollArea } from "@mantine/core"
import { DEFAULT_MAPS_HEIGHT, DEFAULT_MAPS_WIDTH } from "@config/maps"


const useStyles = createStyles({
  wrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  canvas: {
    padding: 50,
    minWidth: "100%",
    display: "flex",
    justifyContent: "center"
  },
  map: {
    width: "100%",
    height: "100%",
    position: "relative"
  }
})

export const MapWrapper = (props: PropsWithChildren) => {
  const mapWrapper = useStore(state => state.mapWrapper)

  const mapWrapperRef = useStore(state => state.mapWrapperRef)

  const { classes } = useStyles()

  return (
    <div className={classes.wrapper}>
      <ExternalControl />
      {mapWrapper.type === "auto" && <div ref={mapWrapperRef} className={classes.map}>{props.children}</div>}
      {mapWrapper.type === "custom" && (
        <div className={classes.container}>
          <ScrollArea style={{ height: "100%", width: "100%" }} styles={{ thumb: { zIndex: 4 } }}>
            <div className={classes.canvas}>
              <Paper
                shadow="xl"
                radius="xs"
                style={{
                  width: mapWrapper.width ?? DEFAULT_MAPS_WIDTH,
                  height: mapWrapper.height ?? DEFAULT_MAPS_HEIGHT,
                  padding: 1
                }}>
                <div ref={mapWrapperRef} className={classes.map}>{props.children}</div>
              </Paper>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}