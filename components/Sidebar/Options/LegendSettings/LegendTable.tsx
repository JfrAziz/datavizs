import { useStore } from "@stores/maps";
import { randomColor } from "@utils/colors";
import { useEffect, useState } from "react";
import { ColorSwatchs } from "./ColorSwatchs";
import { useDebounce } from "@utils/debounce";
import { Refresh, Trash } from "tabler-icons-react";
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

  useEffect(() => { setColor(color) }, [color])

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


export const LegendTable = () => {
  const legends = useStore(state => state.legends)

  const toggleHidden = useStore.getState().toggleHiddenLegend

  const deleteLegend = useStore.getState().deleteLegend

  const updateValue = useDebounce(useStore.getState().updateLegendValue, 500)

  const updateColor = useDebounce(useStore.getState().updateLegendColor, 500)

  if (legends.length === 0) return null

  return (
    <>
      <ColorSwatchs colors={legends.map(item => item.color)} />
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
          {legends.map((item, idx) => (
            <tr key={idx}>
              <td>
                <InputText key={item.color} value={item.value} onChange={(value) => updateValue(idx, value)} />
              </td>
              <td>
                <InputColor color={item.color} onChange={(color) => updateColor(idx, color)} />
              </td>
              <td>
                <Checkbox checked={item.hidden} onChange={() => toggleHidden(idx)} />
              </td>
              <td>
                <ActionIcon color="red" variant="filled" onClick={() => deleteLegend(idx)}>
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