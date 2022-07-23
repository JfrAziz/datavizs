import { createStyles, Paper } from "@mantine/core"
import { useStore } from "@stores/maps"

const useStyles = createStyles(theme => ({
  container: {
    position: "absolute",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    bottom: 0,
    right: 5,
    zIndex: 1,
    fontSize: theme.fontSizes.xs,

    'a' : {
      color: theme.primaryColor
    }
  }
}))

export const AttributionLayer = () => {
  const { classes } = useStyles()

  const baseMap = useStore(state => state.baseMap)

  if (!baseMap) return null;

  return (
    <Paper className={classes.container} radius={0}>
      <div dangerouslySetInnerHTML={{ __html: `Leaflet | ${baseMap.attribution}` }} />
    </Paper>
  )
} 