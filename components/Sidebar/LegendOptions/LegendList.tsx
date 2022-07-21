import { useStore } from "@stores/maps";
import { randomColor } from "@utils/colors";
import { useEffect, useState } from "react";
import { useDebounce } from "@utils/debounce";
import { Divider } from "@components/Sidebar/Common/Divider";
import { Eye, EyeOff, Refresh, Trash } from "tabler-icons-react";
import { TextInput, ActionIcon, ColorInput, Group, Stack, SegmentedControl, NumberInput, Tooltip, } from "@mantine/core";


/**
 * Input color components for each legend so we can use single debounce function
 * to update. Debounce so useful for rapid update in color picker
 */
 interface InputColorProps {
  color: string;

  onChange: (value: any) => void
}
const InputColor = ({ color, onChange }: InputColorProps) => {
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

  return <ColorInput sx={{ flex: 1 }} label="Color" format="hex" value={value} onChange={updateColor} rightSection={<RandomButton />} />
}

/**
 * Input text (string or number) for each legend so we can use single debounce function
 * to update each row. This component used by label and value (single)
 */
interface InputTextProps {
  value: string | number;

  label?: string;

  placeholder?: string

  onChange: (value: any) => void
}

const InputText = ({ value, onChange, ...others }: InputTextProps) => {
  const [val, setVal] = useState(value)

  const updateColor = (value: string) => {
    setVal(value)
    onChange(value)
  }

  return <TextInput sx={{ flex: 1 }} {...others} value={val} onChange={e => updateColor(e.target.value)} />
}


/**
 * Input min max value for range type legend. Parent can handle the value from
 * onChange props. We can do props drilling and use single debounce function
 * to all legend items. 
 * 
 */
interface InputMinMaxProps {
  value: number[]

  onChange: (value: number[]) => void
}

const InputMinMax = ({ value, onChange }: InputMinMaxProps) => {
  const [rangeValue, setRangeValue] = useState<number[]>(value)

  const updateValue = (idx: number, value: number) => {
    const newValue = idx === 0 ? [value, rangeValue[1]] : [rangeValue[0], value]

    setRangeValue(newValue)

    onChange(newValue)
  }

  return (
    <>
      <NumberInput
        placeholder="min"
        sx={{ flex: 1 }}
        value={rangeValue[0]}
        onChange={value => updateValue(0, value as number)}
      />
      <NumberInput
        placeholder="max"
        min={rangeValue[0]}
        sx={{ flex: 1 }}
        value={rangeValue[1]}
        onChange={value => updateValue(1, value as number)}
      />
    </>
  )
}


/**
 * Handle selection value type and it's form to handle it. For type "range"
 * It will return InputMinMax components, InputText otherwise.
 * 
 */
interface InputValueProps {
  type: "equals" | "range"

  value: string[] | number[]

  onChange: (valueType: "equals" | "range", value: string[] | number[]) => void
}

const InputValue = ({ type, value, onChange }: InputValueProps) => {
  const [valueType, setValueType] = useState<"equals" | "range">(type)

  return (
    <>
      <Tooltip label="set value type to compare with the data">
        <SegmentedControl
          value={valueType}
          onChange={(value) => setValueType(value as "equals" | "range")}
          size="xs"
          data={[{ value: 'equals', label: "Single", }, { value: 'range', label: "Range", },]}
        />
      </Tooltip>
      <Group sx={{ flex: 1 }}>
        {valueType === "range" && (
          <InputMinMax
            value={value as number[]}
            onChange={(value) => onChange("range", value)}
          />
        )}

        {valueType === "equals" && (
          <InputText
            value={value[0]}
            placeholder="value"
            onChange={value => onChange("equals", [value])}
          />
        )}
      </Group>
    </>
  )
}



export const LegendList = () => {
  const legends = useStore(state => state.legends)

  const updateLegend = useStore.getState().updateLegend

  const deleteLegend = useStore.getState().deleteLegend

  const updateValue = useDebounce(updateLegend, 500)

  const updateColor = useDebounce(updateLegend, 200)

  if (legends.length === 0) return null

  return (
    <>
      {legends.map(item => (
        <Stack mt="sm" key={item.uuid}>
          <Group grow>
            <InputText
              label="Label"
              placeholder="label on legend"
              value={item.label}
              onChange={(value) => updateValue(item.uuid, { ...item, label: value })}
            />
            <InputColor
              color={item.color}
              onChange={(color) => updateColor(item.uuid, { ...item, color: color })}
            />
          </Group>
          <Group>
            <Group>
              <Tooltip label={item.hidden ? "show in legend" : "hide from legend"}>
                <ActionIcon
                  color={item.hidden ? "gray" : "teal"}
                  variant="filled"
                  onClick={() => updateLegend(item.uuid, { ...item, hidden: !item.hidden })}
                >
                  {item.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                </ActionIcon>
              </Tooltip>
              <Tooltip label="delete this legend">
                <ActionIcon
                  color="red"
                  variant="filled"
                  onClick={() => deleteLegend(item.uuid)}
                >
                  <Trash size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <InputValue
              value={item.value}
              type={item.type}
              onChange={(type, value) => updateValue(item.uuid, { ...item, type: type, value: value })} />
          </Group>
          <Divider mt={0} mb={0} />
        </Stack>
      ))}
    </>
  )
}