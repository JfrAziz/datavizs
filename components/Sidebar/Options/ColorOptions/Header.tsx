import { Button, Group, Tooltip } from "@mantine/core"
import { useFeatureColorStore } from "@store/featureColorStore"

export const HeaderButton = () => {
  const generateGradient = useFeatureColorStore.getState().generateGradient

  const addColor = useFeatureColorStore.getState().addColor

  const resetColors = useFeatureColorStore.getState().resetColors

  return (
    <Group position="apart" my={20}>
      <Tooltip label="Create a gradient colors from the first to the last color">
        <Button size="xs" color="cyan" onClick={generateGradient}>
          Create Gradient
        </Button>
      </Tooltip>
      <Group position="right">
        <Button size="xs" onClick={addColor}>
          Add Color
        </Button>
        <Button size="xs" color="red" onClick={resetColors}>
          Reset Color
        </Button>
      </Group>
    </Group>
  )
}
