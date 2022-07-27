import { useStore } from "@stores/maps"
import { createStyles } from "@mantine/core"

const useStyles = createStyles(theme => ({
  container: {
    position: "absolute",
    right: 5,
    bottom: 0,
    zIndex: 2,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: theme.fontSizes.xs,

    'a': {
      color: theme.primaryColor
    }
  }
}))

export const Attribution = () => {
  const { classes } = useStyles()

  const baseMap = useStore(state => state.baseMap)
  const legendOptions = useStore(state => state.legendOptions)

  if (!baseMap) return null;

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: legendOptions.backgroundColor,
        color: legendOptions.textColor
      }}>
      <div dangerouslySetInnerHTML={{ __html: `Leaflet | ${baseMap.attribution}` }} />
    </div>
  )
} 