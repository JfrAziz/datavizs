import { useStore } from "@stores/maps"
import { ActionIcon, Button, createStyles, Group, Menu, Tooltip } from "@mantine/core"
import { ChevronDown, FocusCentered, Photo, ZoomIn, ZoomOut } from "tabler-icons-react"

const useStyles = createStyles(theme => ({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    padding: 10,
  },
  buttongroup: {
    borderRadius: 0,

    '&:not(:first-of-type)': {
      borderLeftWidth: 0,
    },

    '&:first-of-type': {
      borderTopLeftRadius: theme.radius.sm,
      borderBottomLeftRadius: theme.radius.sm,
    },

    '&:last-of-type': {
      borderTopRightRadius: theme.radius.sm,
      borderBottomRightRadius: theme.radius.sm,
    },
  },
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 2
  },
}))

export const ExternalControl = () => {
  const { classes, theme } = useStyles()

  const map = useStore(state => state.mapRef)

  const setCenter = useStore.getState().setMapToCenter

  const downloadMap = useStore.getState().downloadMap

  return (
    <div className={classes.container}>
      <Group>
        <Group grow spacing={0}>
          <Button size="xs" variant="default" aria-label="Zoom In" onClick={() => map?.zoomIn()} className={classes.buttongroup}>
            <Tooltip label="zoom in">
              <ZoomIn size={16} />
            </Tooltip>
          </Button>
          <Button variant="default" size="xs" aria-label="Zoom Out" onClick={() => map?.zoomOut()} className={classes.buttongroup}>
            <Tooltip label="zoom out">
              <ZoomOut size={16} />
            </Tooltip>
          </Button>
          <Button variant="default" size="xs" aria-label="Focus to GeoJSON" onClick={setCenter} className={classes.buttongroup}>
            <Tooltip label="focus">
              <FocusCentered size={16} />
            </Tooltip>
          </Button>
        </Group>
        <Group noWrap spacing={0}>
          <Button size="xs" className={classes.button} onClick={() => downloadMap()}>
            <Photo size={16} style={{ marginRight: 4 }} /> Export
          </Button>
          <Menu size="lg" transition="pop" placement="end" control={
            <ActionIcon variant="filled" size={30} color={theme.primaryColor} className={classes.menuControl}>
              <ChevronDown size={16} />
            </ActionIcon>
          }>
            <Menu.Item onClick={() => downloadMap("jpeg")}>Export to JPEG</Menu.Item>
            <Menu.Item onClick={() => downloadMap("svg")}>Export to SVG </Menu.Item>
          </Menu>
        </Group>
      </Group>
    </div>
  )
}