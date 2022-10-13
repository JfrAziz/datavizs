import { useEffect } from "react";
import { useStore } from "features/maps/store";
import { useDebounce } from "@lib/hooks/debounce";
import { showNotification } from "@mantine/notifications";
import { Plus, Eraser, Palette, ArrowsSort, ChevronDown } from "tabler-icons-react";
import { Menu, Group, Tooltip, ActionIcon, createStyles, Button, Text, MediaQuery, } from "@mantine/core";


const useStyles = createStyles(theme => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 2
  },
  section: {
    [theme.fn.smallerThan(theme.breakpoints.sm)]: {
      flexWrap: "wrap",

      "> div": {
        flexGrow: 1
      }
    },
  }
}))


/**
 * Show notifications, if no associated key
 * 
 * @returns 
 */
const showNoKeyWarning = () => showNotification({
  title: "Warning",
  message: "Please select on of key from geoJSON",
  color: "yellow"
})


/**
 * Header Button to add a new legend, reset current legends, and 
 * generate gradient from available color in the legend
 * 
 * @returns JSX
 */
export const LegendHeader = () => {
  const { classes, theme } = useStyles()

  const legends = useStore(state => state.legends)

  const addLegends = useStore.getState().addLegends
  
  const sortLegend = useStore.getState().sortLegend
  
  const resetLegends = useStore.getState().resetLegends
  
  const legendKey = useStore(state => state.legendSettings).key
  
  const generateGradient = useStore.getState().generateGradient

  const generateQuantileLegends = useStore.getState().generateQuantileLegends

  const syncFeatureWithLegend = useDebounce(useStore.getState().syncFeaturesWithLegend, 300)

  // sync all features color whenever legends and legendKey updated 
  useEffect(() => {
    syncFeatureWithLegend()
  }, [legends, legendKey, syncFeatureWithLegend])


  const generateUniqueLegends = () => {

    if (!legendKey) return showNoKeyWarning();

    return useStore.getState().generateUniqueLegends(legendKey)
  }

  const quantileLegends = () => {
    if (!legendKey) return showNoKeyWarning();

    return generateQuantileLegends(legendKey, [0, 0.25, 0.5, 0.75, 1])
  }

  const quintileLegends = () => {
    if (!legendKey) return showNoKeyWarning();

    return generateQuantileLegends(legendKey, [0, 0.2, 0.4, 0.6, 0.8, 1])
  }

  const decileLegends = () => {
    if (!legendKey) return showNoKeyWarning();

    return generateQuantileLegends(legendKey, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
  }

  return (
    <Group noWrap position="apart" align="flex-end" className={classes.section}>
      <Group noWrap spacing={0}>
        <MediaQuery smallerThan={400} styles={{ display: "none" }}>
          <Button variant="filled" size="xs" color={theme.primaryColor} className={classes.button} onClick={addLegends}  >
            <Text size="xs">Create a Legend</Text>
          </Button>
        </MediaQuery>
        <MediaQuery largerThan={400} styles={{ display: "none" }}>
          <ActionIcon variant="filled" size={30} color={theme.primaryColor} className={classes.button} onClick={addLegends}  >
            <Plus size={14} />
          </ActionIcon>
        </MediaQuery>
        <Menu>
          <Menu.Target>
            <ActionIcon variant="filled" size={30} color={theme.primaryColor} className={classes.menuControl}>
              <ChevronDown size={14} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={generateUniqueLegends}>Generate from unique value</Menu.Item>
            <Menu.Item onClick={quantileLegends}>Generate from quartile (4 parts)</Menu.Item>
            <Menu.Item onClick={quintileLegends}>Generate from quintile (5 parts)</Menu.Item>
            <Menu.Item onClick={decileLegends}>Generate from decile (10 parts)</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Group position="right" noWrap >
        <Menu>
          <Menu.Target>
            <ActionIcon variant="filled" size={30}>
              <ArrowsSort size={14} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => sortLegend("label", "asc")}>Sort by label (asc)</Menu.Item>
            <Menu.Item onClick={() => sortLegend("label", "desc")}>Sort by label (desc)</Menu.Item>
            <Menu.Item onClick={() => sortLegend("value", "asc")}>Sort by value (asc)</Menu.Item>
            <Menu.Item onClick={() => sortLegend("value", "desc")}>Sort by label (desc)</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Tooltip label="Generate gradient colors from the first to the last color">
          <ActionIcon color="violet.7" variant="filled" onClick={generateGradient}>
            <Palette size={14} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Clear all legends">
          <ActionIcon color="red" variant="filled" onClick={resetLegends}>
            <Eraser size={14} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  )
}