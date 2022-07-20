import { useState } from "react"
import { useStore } from "@stores/maps"
import { legendOperator } from "@stores/maps/utils/legends"
import { Button, Group, Select, Tooltip } from "@mantine/core"
import { ListItem } from "@components/Sidebar/Common/ListItem"

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
          Add Color
        </Button>
        <Button size="xs" color="red" onClick={resetLegends}>
          Reset Color
        </Button>
      </Group>
    </Group>
  )
}

export const FooterButton = () => {
  const colors = useStore(state => state.legends)
  const applyColor = useStore.getState().updateFeatureColor

  const keys = useStore(state => state.propertiesKeys)

  const [selectionType, setSelectionType] = useState<string>(legendOperator[0].name)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const updateSelectionType = (name: string) => {
    const selected = legendOperator.find(item => item.name === name)
    setSelectionType(selected?.name || legendOperator[0].name)
  }

  const updateFeatureColor = () => {
    if (!selectedKey) return;

    const selected = legendOperator.find(item => item.name === selectionType)

    if (!selected) return;

    return applyColor(selectedKey, colors, selected.value)
  }

  if (!colors.length) return null

  return (
    <>
      <Group position="apart" my={20}>
        <Select label="Select key to apply the color" data={keys} value={selectedKey} onChange={setSelectedKey} />
        <Select label="Operator to compare with value" data={legendOperator.map(item => item.name)} value={selectionType} onChange={updateSelectionType} />
      </Group>
      <ListItem title="Apply color to key" description="This will apply the color based on compared value">
        <Button onClick={updateFeatureColor}>
          Apply Color
        </Button>
      </ListItem>
    </>
  )
}
