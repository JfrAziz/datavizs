import { ColorInput, createStyles, Divider, Group, NumberInput, Select, Switch } from "@mantine/core"
import { useStore } from "@stores/maps"
import { BaseList, ListItem } from "@components/Sidebar/Common/ListItem"

const useStyles = createStyles(theme => ({
  split: {
    paddingTop: theme.spacing.md,
    [theme.fn.smallerThan(theme.breakpoints.sm)]: {
      flexWrap: "wrap"
    },
  }
}))

export const ShowLegend = () => {
  const { classes, theme } = useStyles()
  const legendOptions = useStore(state => state.legendOptions)

  const toggleShowLegend = () => {
    useStore.setState(state => ({ legendOptions: { ...legendOptions, show: !state.legendOptions.show } }))
  }

  const changeDirection = (value: "column" | "row") => useStore.setState(state => ({
    legendOptions: { ...state.legendOptions, direction: value }
  }))

  return (
    <>
      <ListItem title="Show legend" description="legend will display additional information on the maps">
        <Switch checked={legendOptions.show} onChange={toggleShowLegend} />
      </ListItem>
      {legendOptions.show && (
        <>
          <BaseList className={classes.split}>
            <Group noWrap sx={{ width: "100%" }} grow>
              <NumberInput
                min={0}
                size="xs"
                label="Width"
                placeholder="px"
                stepHoldDelay={500}
                stepHoldInterval={(t) => Math.max(1000 / t ** 4, 25)} />
              <NumberInput
                min={0}
                size="xs"
                label="Height"
                placeholder="px"
                stepHoldDelay={500}
                stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)} />
            </Group>
            <Group noWrap sx={{ width: "100%" }} grow>
              <NumberInput size="xs" placeholder="px" label="Spacing" />
              <Select
                size="xs"
                label="Direction"
                defaultValue="column"
                data={["column", "row"]}
                onChange={changeDirection}
                value={legendOptions.direction}
              />
            </Group>
          </BaseList>
          <BaseList className={classes.split}>
            <Group noWrap sx={{ width: "100%" }} grow>
              <NumberInput size="xs" placeholder="px" label="Text Size" />
              <NumberInput size="xs" placeholder="px" label="Simbol Size" />
            </Group>
            <Group noWrap sx={{ width: "100%" }} grow>
              <ColorInput size="xs" label="Background Color" />
              <ColorInput size="xs" label="Text Color" />
            </Group>
          </BaseList>
        </>
      )}
    </>
  )
}
