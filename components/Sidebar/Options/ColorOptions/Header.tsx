import { useLegendStore } from "@store/legendStore"
import { Button, Group, Tooltip } from "@mantine/core"

export const HeaderButton = () => {
  const addLegends = useLegendStore.getState().addLegends
  
  const resetLegends = useLegendStore.getState().resetLegends
  
  const generateGradient = useLegendStore.getState().generateGradient
  
  return (
    <Group position="apart" my={20}>
      <Tooltip label="Create a gradient colors from the first to the last color">
        <Button size="xs" color="cyan" onClick={generateGradient}>
          Create Gradient
        </Button>
      </Tooltip>
      <Group position="right">
        <Button size="xs" onClick={addLegends}>
          Add Color
        </Button>
        <Button size="xs" color="red" onClick={resetLegends}>
          Reset Color
        </Button>
      </Group>
    </Group>
  )
}
