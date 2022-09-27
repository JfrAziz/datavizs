import { useStore } from "@geojson/store"
import { Settings } from "@components/Settings"
import { QuestionMark } from "tabler-icons-react"
import { InputMinMax } from "@components/Input/InputMinMax"
import { ColorInput, createStyles, Group, Input, Stack, Switch, Text, ThemeIcon } from "@mantine/core"

const useStyles = createStyles(theme => ({
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

export const ProportionalCircle = () => {
  const { classes } = useStyles()

  const settings = useStore(state => state.proportionalCircle)

  const update = useStore.getState().updateProportionalCircle

  const toggleProportionalCircle = () => update({ show: !settings.show })

  const updateCircleColor = (color: string) => update({ color: color })

  const updateBorderColor = (color: string) => update({ borderColor: color })

  return (
    <>
      <Settings title="Proportional Circle" description="Show circle on each features with proportional size based on legend value">
        <Switch checked={settings.show} onChange={toggleProportionalCircle} />
      </Settings>
      {settings.show && (
        <Stack mt={20}>
          <Input.Wrapper label="Min Max Radius (meters)" size="xs">
            <Group>
              <InputMinMax value={settings} onChange={(value) => update({ min: value.min, max: value.max })} />
            </Group>
          </Input.Wrapper>
          <Group grow>
            <Input.Wrapper label="Fill Color" size="xs" className={classes.item}>
              <ColorInput value={settings.color} onChange={updateCircleColor} format="rgba" />
            </Input.Wrapper>
            <Input.Wrapper label="Border Color" size="xs" className={classes.item}>
              <ColorInput value={settings.borderColor} onChange={updateBorderColor} format="rgba" />
            </Input.Wrapper>
          </Group>
          <Group>
            <ThemeIcon variant="light" size="sm">
              <QuestionMark size={14} />
            </ThemeIcon>
            <Text size="xs">
              You can move the center coordinates for each features
            </Text>
          </Group>
        </Stack>
      )}
    </>
  )
}