import { useStore } from "@maps/store"
import { LabelSettings } from "@maps/store/types"
import { Settings, SettingsWrapper } from "@components/Settings"
import { ColorInput, createStyles, Input, Select, Slider, Switch } from "@mantine/core"

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
}))

interface LabelSettingsProps {
  settings: LabelSettings

  update: (settings: Partial<LabelSettings>) => void
}

const LabelKey = ({ settings, update: updateFunction } : LabelSettingsProps) => {

  const keys = useStore(state => state.propertiesKeys)

  const updateKey = (key: string) => updateFunction({ key: key })

  return (
    <Settings title="Label Key" description="Select column to show on the map">
      <Select
        size="xs"
        searchable
        value={settings.key}
        onChange={updateKey}
        disabled={keys.length === 0}
        data={keys.filter(key => key !== "color")}
      />
    </Settings>
  )
}

const LabelStyle = ({ settings, update: updateFunction } : LabelSettingsProps) => {
  const { classes } = useStyles()

  const changeColor = (value: string) => updateFunction({ color: value })

  const updateFontSize = (value: number | undefined) => updateFunction({ size: value ?? 12 })

  return (
    <SettingsWrapper grow className={classes.section}>
      <Input.Wrapper label="Font Size" size="xs" className={classes.item}>
        <Slider
          value={settings.size}
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
        <ColorInput value={settings.color} onChange={changeColor} />
      </Input.Wrapper>
    </SettingsWrapper>
  )

}


export const LabelControl = () => {
  const settings = useStore(state => state.labelSettings)

  const update = useStore.getState().updateLabelSettings

  const toggle = () => update({ show: !settings.show })

  return (
    <>
      <Settings title="Show Label?" description="Show label on the maps">
        <Switch checked={settings.show} onChange={toggle} />
      </Settings>
      {settings.show && (
        <>
          <LabelKey settings={settings} update={update} />
          <LabelStyle settings={settings} update={update} />
        </>
      )}
    </>
  )
}