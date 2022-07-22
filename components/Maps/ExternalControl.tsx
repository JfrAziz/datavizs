import { useStore } from "@stores/maps"
import { FocusCentered, ZoomIn, ZoomOut } from "tabler-icons-react"
import { Button, createStyles, Group, Tooltip } from "@mantine/core"

const useStyles = createStyles(theme => ({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    padding: 10,
  },
  button: {
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
}))

export const ExternalControl = () => {
  const { classes } = useStyles()

  const map = useStore(state => state.map)
  
  const setCenter = useStore.getState().setMapToCenter

  return (
    <div className={classes.container}>
      <Group grow spacing={0}>
        <Button variant="default" size="xs" className={classes.button} onClick={() => map?.zoomIn()}>
          <Tooltip label="zoom in"><ZoomIn size={16} /></Tooltip>
        </Button>
        <Button variant="default" size="xs" className={classes.button} onClick={() => map?.zoomOut()}>
          <Tooltip label="zoom out"><ZoomOut size={16} /></Tooltip>
        </Button>
        <Button variant="default" size="xs" className={classes.button} onClick={setCenter}>
          <Tooltip label="focus"><FocusCentered size={16} /></Tooltip>
        </Button>
      </Group>
    </div>
  )
}