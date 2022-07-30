import { Button, ColorInput, createStyles, Divider, Group, InputWrapper, NumberInput, Select, Slider, Switch } from "@mantine/core"
import { useStore } from "@stores/maps"
import { BaseList, ListItem } from "@components/Sidebar/Common/ListItem"

const useStyles = createStyles(theme => ({
  split: {
    paddingTop: theme.spacing.xl,
    [theme.fn.smallerThan(theme.breakpoints.sm)]: {
      flexWrap: "wrap"
    },
  }
}))

export const ShowLegend = () => {
  const { classes, theme } = useStyles()
  const legendOptions = useStore(state => state.legendOptions)
  const resetOptions = useStore.getState().resetLegendOptions

  const toggleShowLegend = () => useStore.setState(state => ({
    legendOptions: { ...legendOptions, show: !state.legendOptions.show }
  }))

  const changeDirection = (value: "column" | "row") => useStore.setState(state => ({
    legendOptions: { ...state.legendOptions, direction: value }
  }))

  const changeSlider = (value: number) => useStore.setState(state => ({
    legendOptions: { ...state.legendOptions, spacing: value }
  }))

  const changeFontSize = (value: number | undefined) => useStore.setState(state => ({
    legendOptions: { ...state.legendOptions, fontSize: value ?? 12 }
  }))

  const changeSymbolSize = (value: number | undefined) => useStore.setState(state => ({
    legendOptions: { ...state.legendOptions, symbolSize: value ?? 25 }
  }))

  const changeBackgroudColor = (value: string) => useStore.setState(state => ({
    legendOptions: { ...state.legendOptions, backgroundColor: value }
  }))

  const changeFontColor = (value: string) => useStore.setState(state => ({
    legendOptions: { ...state.legendOptions, fontColor: value }
  }))

  return (
    <>
      <ListItem title="Show legend" description="legend will display additional information on the maps">
        <Switch checked={legendOptions.show} onChange={toggleShowLegend} />
      </ListItem>
      {legendOptions.show && (
        <>
          <BaseList grow className={classes.split}>
            <InputWrapper label="Spacing" size="xs">
              <Slider
                value={legendOptions.spacing}
                onChange={changeSlider}
                label={(value) => `${value} px`}
                labelTransition="skew-down"
                labelTransitionDuration={150}
                labelTransitionTimingFunction="ease"
                marks={[
                  { value: 0, label: '0' },
                  { value: 100, label: '100 px' },
                ]} />
            </InputWrapper>
            <Select
              size="xs"
              label="Direction"
              defaultValue="column"
              data={["column", "row"]}
              onChange={changeDirection}
              value={legendOptions.direction}
            />
          </BaseList>
          <BaseList grow className={classes.split}>
            <InputWrapper label="Font Size" size="xs">
              <Slider
                value={legendOptions.fontSize}
                onChange={changeFontSize}
                label={(value) => `${value} px`}
                labelTransition="skew-down"
                labelTransitionDuration={150}
                labelTransitionTimingFunction="ease"
                marks={[
                  { value: 0, label: '0' },
                  { value: 100, label: '100 px' },
                ]} />
            </InputWrapper>
            <InputWrapper label="Symbol Size" size="xs">
              <Slider
                value={legendOptions.symbolSize}
                onChange={changeSymbolSize}
                label={(value) => `${value} px`}
                labelTransition="skew-down"
                labelTransitionDuration={150}
                labelTransitionTimingFunction="ease"
                marks={[
                  { value: 0, label: '0' },
                  { value: 100, label: '100' },
                ]} />
            </InputWrapper>
          </BaseList>
          <BaseList grow className={classes.split}>
            <Group noWrap sx={{ width: "100%" }} grow>
              <ColorInput size="xs" value={legendOptions.backgroundColor} onChange={changeBackgroudColor} format="rgba" label="Background Color" />
              <ColorInput size="xs" value={legendOptions.fontColor} onChange={changeFontColor} label="Text Color" />
            </Group>
          </BaseList>
          <BaseList className={classes.split}>
            <Button onClick={resetOptions}>Reset</Button>
          </BaseList>
        </>
      )}
    </>
  )
}
