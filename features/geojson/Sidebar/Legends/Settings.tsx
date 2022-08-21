import { useStore } from "@geojson/store"
import { InputText } from "@components/Input"
import { useDebounce } from "@lib/utils/debounce"
import { QuestionMark } from "tabler-icons-react"
import { LegendOptions } from "@geojson/store/types"
import { Options, OptionWrapper } from "@components/Options"
import {
  Text,
  Input,
  Group,
  Select,
  Slider,
  Switch,
  Button,
  Tooltip,
  ThemeIcon,
  ColorInput,
  createStyles,
} from "@mantine/core"
import { Divider } from "@components/Divider"


const useStyles = createStyles(theme => ({
  section: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
    [theme.fn.smallerThan(theme.breakpoints.xs)]: {
      alignItems: "stretch",
      flexDirection: "column-reverse",
      marginTop: theme.spacing.xs
    },
  },

  item: {
    [theme.fn.smallerThan(theme.breakpoints.xs)]: {
      maxWidth: "unset"
    },
  },

  info: {
    flex: 1,
    [theme.fn.largerThan(theme.breakpoints.xs)]: {
      display: "none"
    },
  }
}))



interface LegendSettingsProps {
  options: LegendOptions;

  updateOptions: (legend: Partial<LegendOptions>) => void
}


/**
 * Update spacing and direction of legend
 * 
 * @param props LegendSettingsProps
 * @returns 
 */
const SpacingAndDirection = ({ options, updateOptions }: LegendSettingsProps) => {
  const { classes } = useStyles()

  const updateSpacing = (value: number) => updateOptions({ spacing: value })

  const changeDirection = (value: "column" | "row") => updateOptions({ direction: value })

  return (
    <OptionWrapper grow className={classes.section}>
      <Input.Wrapper label="Spacing" size="xs" className={classes.item} >
        <Slider
          value={options.spacing}
          onChange={updateSpacing}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          label={(value) => `${value} px`}
          labelTransitionTimingFunction="ease"
          marks={[
            { value: 0, label: '0' },
            { value: 100, label: '100 px' },
          ]} />
      </Input.Wrapper>
      <Input.Wrapper label="Direction" size="xs" className={classes.item}>
        <Select defaultValue="column" data={["column", "row"]} value={options.direction} onChange={changeDirection} />
      </Input.Wrapper>
    </OptionWrapper>
  )
}


/**
 * Update font size and font color of legends item
 * 
 * @param props LegendSettingsProps
 * @returns 
 */
const FontOptions = ({ options, updateOptions }: LegendSettingsProps) => {
  const { classes } = useStyles()

  const changeFontColor = (value: string) => updateOptions({ fontColor: value })

  const updateFontSize = (value: number | undefined) => updateOptions({ fontSize: value ?? 12 })

  return (
    <OptionWrapper grow className={classes.section}>
      <Input.Wrapper label="Font Size" size="xs" className={classes.item}>
        <Slider
          value={options.fontSize}
          onChange={updateFontSize}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          label={(value) => `${value} px`}
          labelTransitionTimingFunction="ease"
          marks={[
            { value: 0, label: '0' },
            { value: 100, label: '100px' },
          ]} />
      </Input.Wrapper>
      <Input.Wrapper label="Font Color" size="xs" className={classes.item}>
        <ColorInput value={options.fontColor} onChange={changeFontColor} />
      </Input.Wrapper>
    </OptionWrapper>
  )
}


/**
 * Update backeground color and symbol size
 * 
 * @param props LegendSettingsProps 
 * @returns 
 */
const BackgroundAndSymbol = ({ options, updateOptions }: LegendSettingsProps) => {
  const { classes } = useStyles()

  const changeBackgroudColor = (value: string) => updateOptions({ backgroundColor: value })

  const updateSymbolSize = (value: number | undefined) => updateOptions({ symbolSize: value ?? 25 })

  return (
    <OptionWrapper grow className={classes.section}>
      <Input.Wrapper label="Symbol Size" size="xs" className={classes.item}>
        <Slider
          value={options.symbolSize}
          onChange={updateSymbolSize}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          label={(value) => `${value} px`}
          labelTransitionTimingFunction="ease"
          marks={[
            { value: 0, label: '0' },
            { value: 100, label: '100px' },
          ]} />
      </Input.Wrapper>
      <Input.Wrapper label="Background Color" size="xs" className={classes.item}>
        <ColorInput format="rgba" onChange={changeBackgroudColor} value={options.backgroundColor} />
      </Input.Wrapper>
    </OptionWrapper>
  )
}


/**
 * Update title of legend and other settings, (e.g. reset legends)
 * 
 * @returns 
 */
const TitleAndOthers = () => {
  const { classes } = useStyles()

  const legendTitle = useStore(state => state.legendTitle)

  const resetOptions = useStore.getState().resetLegendOptions

  const updateTitle = useDebounce(useStore.getState().updateLegendTitle, 500)

  return (
    <OptionWrapper className={classes.section} grow align="flex-end">
      <Group className={classes.item}>
        <Tooltip label="Reset legend to initial settings">
          <Button size="xs" variant="light" color="red" onClick={resetOptions}>
            Reset
          </Button>
        </Tooltip>
        <Tooltip label="Move and resize the legend by dragging it on map">
          <ThemeIcon variant="light" size={30}>
            <QuestionMark size={16} />
          </ThemeIcon>
        </Tooltip>
        <Text className={classes.info} size="xs">
          Move and resize the legend by dragging it on map
        </Text>
      </Group>
      <Input.Wrapper label="Title" placeholder="Legend Title" size="xs" className={classes.item}>
        <InputText value={legendTitle} onChange={value => updateTitle(value)} />
      </Input.Wrapper>
    </OptionWrapper>
  )
}


/**
 * Display all settings and add show or hide other legends settings
 * 
 * @returns 
 */
export const LegendSettings = () => {
  const options = useStore(state => state.legendOptions)

  const updateOptions = useStore.getState().updateLegendOptions

  const toggleShowLegend = () => updateOptions({ show: !options.show })

  return (
    <>
      <Options title="Legend" description="Show legend & additional information on the maps">
        <Switch checked={options.show} onChange={toggleShowLegend} />
      </Options>
      {options.show && (
        <>
          <SpacingAndDirection options={options} updateOptions={updateOptions} />
          <FontOptions options={options} updateOptions={updateOptions} />
          <BackgroundAndSymbol options={options} updateOptions={updateOptions} />
          <TitleAndOthers />
          <Divider />
        </>
      )}
    </>
  )
}
