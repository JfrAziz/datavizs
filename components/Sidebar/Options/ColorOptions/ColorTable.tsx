import { useState } from "react";
import { ColorSwatchs } from "./ColorSwatchs";
import { useDebounce } from "@utils/debounce";
import { randomColor } from "@utils/featureColor";
import { Refresh, Trash } from "tabler-icons-react";
import { useFeatureColorStore } from "@store/featureColorStore";
import { Table, Checkbox, TextInput, ActionIcon, ColorInput, } from "@mantine/core";


/**
 * Input color components for each row so we can use single debounce function
 * to update each row. Debounce so useful for rapid update in color picker
 */
const InputColor = ({ color, onChange }: { color: string, onChange: (value: any) => void }) => {
  const [value, setColor] = useState<string>(color)

  const updateColor = (value: string) => {
    setColor(value)
    onChange(value)
  }

  const RandomButton = () => (
    <ActionIcon onClick={() => updateColor(randomColor())}>
      <Refresh size={16} />
    </ActionIcon>
  )

  return <ColorInput format="hex" value={value} onChange={updateColor} rightSection={<RandomButton />} />
}

/**
 * Input value components for each row so we can use single debounce function
 * to update each row
 */
const InputText = ({ value, onChange }: { value: string | number, onChange: (value: any) => void }) => {
  const [val, setVal] = useState(value)

  const updateColor = (value: string) => {
    setVal(value)
    onChange(value)
  }

  return <TextInput value={val} onChange={e => updateColor(e.target.value)} />
}


export const ColorsTable = () => {
  const colors = useFeatureColorStore(state => state.colors)

  const toggleHidden = useFeatureColorStore.getState().toggleHidden

  const deleteColor = useFeatureColorStore.getState().deleteColor

  const updateValue = useDebounce(useFeatureColorStore.getState().updateValue, 500)

  const updateColor = useDebounce(useFeatureColorStore.getState().updateColor, 500)

  if (colors.length === 0) return null

  return (
    <>
      <ColorSwatchs colors={colors} />
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th>Value</th>
            <th>Color</th>
            <th>Hidden</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((item, idx) => (
            <tr key={idx}>
              <td>
                <InputText value={item.value} onChange={(value) => updateValue(idx, value)} />
              </td>
              <td>
                <InputColor color={item.color} onChange={(color) => updateColor(idx, color)} />
              </td>
              <td>
                <Checkbox checked={item.hidden} onChange={() => toggleHidden(idx)} />
              </td>
              <td>
                <ActionIcon color="red" variant="filled" onClick={() => deleteColor(idx)}>
                  <Trash size={14} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}