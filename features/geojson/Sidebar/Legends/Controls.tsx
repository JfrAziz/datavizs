import { useStore } from "@geojson/store"
import { InfoCircle, Refresh } from "tabler-icons-react"
import { Options, OptionWrapper } from "@components/Options"
import {
  Text,
  Input,
  Group,
  Select,
  Slider,
  Switch,
  Tooltip,
  ColorInput,
  ActionIcon,
  createStyles,
} from "@mantine/core"

const useStyles = createStyles(theme => ({
  section: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
    [theme.fn.smallerThan(theme.breakpoints.sm)]: {
      flexWrap: "wrap"
    },
  }
}))

export const ShowLegend = () => {
  const { classes, theme } = useStyles()

  const legendOptions = useStore(state => state.legendOptions)

  const resetOptions = useStore.getState().resetLegendOptions

  const updateOptions = useStore.getState().updateLegendOptions

  const updateSpacing = (value: number) => updateOptions({ spacing: value })

  const toggleShowLegend = () => updateOptions({ show: !legendOptions.show })

  const changeFontColor = (value: string) => updateOptions({ fontColor: value })

  const changeDirection = (value: "column" | "row") => updateOptions({ direction: value })

  const changeBackgroudColor = (value: string) => updateOptions({ backgroundColor: value })

  const updateFontSize = (value: number | undefined) => updateOptions({ fontSize: value ?? 12 })

  const updateSymbolSize = (value: number | undefined) => updateOptions({ symbolSize: value ?? 25 })


  return (
    <>
      <Options title="Show legend" description="Legend shows additional information on the maps">
        <Switch checked={legendOptions.show} onChange={toggleShowLegend} />
      </Options>
      {legendOptions.show && (
        <>
          <OptionWrapper grow className={classes.section}>
            <Input.Wrapper label="Spacing" size="xs">
              <Slider
                value={legendOptions.spacing}
                onChange={updateSpacing}
                label={(value) => `${value} px`}
                labelTransition="skew-down"
                labelTransitionDuration={150}
                labelTransitionTimingFunction="ease"
                marks={[
                  { value: 0, label: '0' },
                  { value: 100, label: '100 px' },
                ]} />
            </Input.Wrapper>
            <Select
              size="xs"
              label="Direction"
              defaultValue="column"
              data={["column", "row"]}
              onChange={changeDirection}
              value={legendOptions.direction}
            />
          </OptionWrapper>
          <OptionWrapper grow className={classes.section}>
            <Input.Wrapper label="Font Size" size="xs">
              <Slider
                value={legendOptions.fontSize}
                onChange={updateFontSize}
                label={(value) => `${value} px`}
                labelTransition="skew-down"
                labelTransitionDuration={150}
                labelTransitionTimingFunction="ease"
                marks={[
                  { value: 0, label: '0' },
                  { value: 100, label: '100 px' },
                ]} />
            </Input.Wrapper>
            <ColorInput
              size="xs"
              label="Font Color"
              onChange={changeFontColor}
              value={legendOptions.fontColor}
            />
          </OptionWrapper>
          <OptionWrapper grow className={classes.section}>
            <Group noWrap sx={{ flex: 1 }} grow >
              <Input.Wrapper label="Symbol Size" size="xs">
                <Slider
                  value={legendOptions.symbolSize}
                  onChange={updateSymbolSize}
                  label={(value) => `${value} px`}
                  labelTransition="skew-down"
                  labelTransitionDuration={150}
                  labelTransitionTimingFunction="ease"
                  marks={[
                    { value: 0, label: '0' },
                    { value: 100, label: '100px' },
                  ]} />
              </Input.Wrapper>
              <ColorInput
                size="xs"
                format="rgba"
                label="Background Color"
                onChange={changeBackgroudColor}
                value={legendOptions.backgroundColor}
              />
            </Group>
          </OptionWrapper>
          <OptionWrapper className={classes.section} style={{ paddingTop: theme.spacing.xl }}>
            <Group style={{ color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6] }} spacing={10}>
              <InfoCircle strokeWidth={1.5} size={20} />
              <Text size="xs">You can move and resize the legend by dragging it on map</Text>
            </Group>
            <Tooltip label="Reset to initial settings">
              <ActionIcon variant="light" color="red" onClick={resetOptions}>
                <Refresh size={14} />
              </ActionIcon>
            </Tooltip>
          </OptionWrapper>
        </>
      )}
    </>
  )
}
