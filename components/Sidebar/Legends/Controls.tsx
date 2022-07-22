import { useState } from "react"
import { useStore } from "@stores/maps"
import { Button, Group, Select, Tooltip } from "@mantine/core"

export const HeaderButton = () => {
  const addLegends = useStore.getState().addLegends

  const resetLegends = useStore.getState().resetLegends

  const generateGradient = useStore.getState().generateGradient

  return (
    <Group position="apart" my={20}>
      <Tooltip label="Create a gradient colors from the first to the last color">
        <Button size="xs" color="cyan" onClick={generateGradient}>
          Create Gradient
        </Button>
      </Tooltip>
      <Group position="right">
        <Button size="xs" onClick={addLegends}>
          Add Legend
        </Button>
        <Button size="xs" color="red" onClick={resetLegends}>
          Reset Legend
        </Button>
      </Group>
    </Group>
  )
}

export const FooterButton = () => {
  const legends = useStore(state => state.legends)
  const applyColor = useStore.getState().updateFeatureColor

  const keys = useStore(state => state.propertiesKeys)

  const [selectedKey, setSelectedKey] = useState<string | null>(null)


  const updateFeatureColor = () => {
    if (!selectedKey) return;

    return applyColor(selectedKey, legends)
  }

  if (!legends.length) return null

  return (
    <Group position="apart" my={20} align="flex-end">
      <Select label="Select key to apply the color" data={keys} value={selectedKey} onChange={setSelectedKey} />
      <Button onClick={updateFeatureColor}>
        Apply Color
      </Button>
    </Group>
  )
}
