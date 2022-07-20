import { useState } from "react"
import { useStore } from "@stores/maps"
import { LegendOperator } from "@stores/maps/types"
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

const data: { name: string, value: LegendOperator }[] = [
  {
    name: "Less Than",
    value: "less-than"
  },
  {
    name: "Greater Than",
    value: "greater-than"
  },
  {
    name: "Equals",
    value: "equal"
  }
]

export const FooterButton = () => {
  const colors = useStore(state => state.legends)
  const applyColor = useStore.getState().updateFeatureColor

  const keys = useStore(state => state.propertiesKeys)

  const [selectionType, setSelectionType] = useState<string>(data[0].name)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const updateSelectionType = (name: string) => {
    const selected = data.find(item => item.name === name)
    setSelectionType(selected?.name || data[0].name)
  }

  const updateFeatureColor = () => {
    if (!selectedKey) return;

    const selected = data.find(item => item.name === selectionType)

    if (!selected) return;

    return applyColor(selectedKey, colors, selected.value)
  }

  return (
    <>
      <Group position="apart" my={20}>
        <Select data={keys} value={selectedKey} onChange={setSelectedKey} />
        <Select data={data.map(item => item.name)} value={selectionType} onChange={updateSelectionType} />
      </Group>
      <ListItem title="Apply color to key" description="apply color">
        <Button onClick={updateFeatureColor}>
          Apply Color
        </Button>
      </ListItem>
    </>
  )
}
