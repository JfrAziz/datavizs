import { useStore } from "@geojson/store"
import { InputText } from "@components/Input"
import { Divider } from "@components/Divider"
import { QuestionMark } from "tabler-icons-react"
import { Settings, SettingsWrapper } from "@components/Settings"
import { LegendSettings as LegendSettingsType } from "@geojson/store/types"
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
  settings: LegendSettingsType;

  updateSettings: (legend: Partial<LegendSettingsType>) => void
}


/**
 * Update spacing and direction of legend
 * 
 * @param props LegendSettingsProps
 * @returns 
 */
const SpacingAndDirection = ({ settings, updateSettings }: LegendSettingsProps) => {
  const { classes } = useStyles()

  const updateSpacing = (value: number) => updateSettings({ spacing: value })

  const changeDirection = (value: "column" | "row") => updateSettings({ direction: value })

  return (
    <SettingsWrapper grow className={classes.section}>
      <Input.Wrapper label="Spacing" size="xs" className={classes.item} >
        <Slider
          value={settings.spacing}
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
        <Select defaultValue="column" data={["column", "row"]} value={settings.direction} onChange={changeDirection} />
      </Input.Wrapper>
    </SettingsWrapper>
  )
}


/**
 * Update font size and font color of legends item
 * 
 * @param props LegendSettingsProps
 * @returns 
 */
const FontSettings = ({ settings, updateSettings }: LegendSettingsProps) => {
  const { classes } = useStyles()

  const changeFontColor = (value: string) => updateSettings({ fontColor: value })

  const updateFontSize = (value: number | undefined) => updateSettings({ fontSize: value ?? 12 })

  return (
    <SettingsWrapper grow className={classes.section}>
      <Input.Wrapper label="Font Size" size="xs" className={classes.item}>
        <Slider
          value={settings.fontSize}
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
        <ColorInput value={settings.fontColor} onChange={changeFontColor} />
      </Input.Wrapper>
    </SettingsWrapper>
  )
}


/**
 * Update backeground color and symbol size
 * 
 * @param props LegendSettingsProps 
 * @returns 
 */
const BackgroundAndSymbol = ({ settings, updateSettings }: LegendSettingsProps) => {
  const { classes } = useStyles()

  const changeBackgroudColor = (value: string) => updateSettings({ backgroundColor: value })

  const updateSymbolSize = (value: number | undefined) => updateSettings({ symbolSize: value ?? 25 })

  return (
    <SettingsWrapper grow className={classes.section}>
      <Input.Wrapper label="Symbol Size" size="xs" className={classes.item}>
        <Slider
          value={settings.symbolSize}
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
        <ColorInput format="rgba" onChange={changeBackgroudColor} value={settings.backgroundColor} />
      </Input.Wrapper>
    </SettingsWrapper>
  )
}


/**
 * Update title of legend and other settings, (e.g. reset legends)
 * 
 * @returns 
 */
const TitleAndOthers = ({ settings, updateSettings }: LegendSettingsProps) => {
  const { classes } = useStyles()

  const resetSettings = useStore.getState().resetLegendSettings

  const updateTitle = (key: string) => updateSettings({ title: key })

  return (
    <SettingsWrapper className={classes.section} grow align="flex-end">
      <Group className={classes.item}>
        <Tooltip label="Reset legend to initial settings">
          <Button size="xs" variant="light" color="red" onClick={resetSettings}>
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
        <InputText value={settings.title} onChange={value => updateTitle(value)} />
      </Input.Wrapper>
    </SettingsWrapper>
  )
}


/**
 * Display all settings and add show or hide other legends settings
 * 
 * @returns 
 */
export const LegendSettings = () => {
  const settings = useStore(state => state.legendSettings)

  const updateSettings = useStore.getState().updateLegendSettings

  const toggleShowLegend = () => updateSettings({ show: !settings.show })

  return (
    <>
      <Settings title="Legend" description="Show legend & additional information on the maps">
        <Switch checked={settings.show} onChange={toggleShowLegend} />
      </Settings>
      {settings.show && (
        <>
          <SpacingAndDirection settings={settings} updateSettings={updateSettings} />
          
          <FontSettings settings={settings} updateSettings={updateSettings} />
          
          <BackgroundAndSymbol settings={settings} updateSettings={updateSettings} />
          
          <TitleAndOthers settings={settings} updateSettings={updateSettings}  />
          
          <Divider />
        </>
      )}
    </>
  )
}
