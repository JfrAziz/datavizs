import { useStore } from "@stores/maps";
import { randomColor } from "@utils/colors";
import { useEffect, useState } from "react";
import { useDebounce } from "@utils/debounce";
import { Legend, minMaxValue } from "@stores/maps/types";
import { Divider } from "@components/Sidebar/Common/Divider";
import { Eye, EyeOff, Refresh, Trash } from "tabler-icons-react";
import {
  Group,
  Stack,
  Tooltip,
  TextInput,
  ActionIcon,
  ColorInput,
  NumberInput,
  SegmentedControl,
  NumberInputProps,
} from "@mantine/core";


/**
 * Input color components for each legend so we can use single debounce function
 * to update. Debounce so useful for rapid update in color picker
 */
interface InputColorProps {
  color: string;

  onChange: (value: string) => void
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

  onChange: (value: string) => void
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
 * Input number for handle range input each legend. This component has
 * state to update a precision of input number dynamically.
 */
const InputNumber = ({ value, onChange, ...others }: NumberInputProps) => {
  const [precision, setPrecision] = useState<number>(0)

  const updateMinValue = (value: number) => {

    if (value !== undefined) {
      const nmbStr = value.toString().split(".")

      if (nmbStr[1]) setPrecision(nmbStr[1].length <= 3 ? nmbStr[1].length : 3)
      else setPrecision(0)
    }

    console.log(onChange)

    if (onChange) return onChange(value)
  }

  return <NumberInput sx={{ flex: 1 }} value={value} precision={precision} onChange={updateMinValue} {...others} />
}

/**
 * Input min max value for range type legend. Parent can handle the value from
 * onChange props. We can do props drilling and use single debounce function
 * to all legend items. 
 */
interface InputMinMaxProps {
  value: minMaxValue

  onChange: (value: minMaxValue) => void
}

const InputMinMax = ({ value, onChange }: InputMinMaxProps) => {
  const [rangeValue, setRangeValue] = useState<minMaxValue>(value)

  const updateValue = (value: minMaxValue) => {
    setRangeValue(value)

    onChange(value)
  }

  return (
    <>
      <InputNumber placeholder="min" value={rangeValue.min} onChange={(min) => updateValue({ max: rangeValue.max, min: min })} />
      <InputNumber placeholder="max" min={rangeValue.min} value={rangeValue.max} onChange={max => updateValue({ min: rangeValue.min, max: max })} />
    </>
  )
}


/**
 * Legend list item and handle type value selection. Some value
 * will be updated with delay (debounce), e.g input text, color, and value.
 */
interface ItemProps {
  item: Legend

  onUpdate: (legend: Legend) => void

  onUpdateEnd?: (legend: Legend) => void

  onDelete: (legend: Legend) => void
}

const Item = ({ item, onDelete, onUpdate, onUpdateEnd }: ItemProps) => {
  const [legend, setLegend] = useState<Legend>(item)

  const updateState = (value: Legend) => {
    setLegend(value)

    return onUpdate(value)
  }

  const updateWithDelay = (value: Legend) => {
    setLegend(value)

    if (onUpdateEnd) return onUpdateEnd(value)

    return onUpdate(value)
  }

  const updateColor = (color: string) => updateWithDelay({ ...legend, color: color })

  const updateLabel = (label: string) => updateWithDelay({ ...legend, label: label })

  const toggleHidden = () => updateState({ ...legend, hidden: !legend.hidden })

  const updateType = (type: "range" | "single") => {
    if (type === "single") return updateState({ ...legend, type: "single", value: "" })

    return updateState({ ...legend, type: type, value: { min: undefined, max: undefined } })
  }

  const updateValueText = (value: string) => updateWithDelay({ ...legend, type: "single", value: value })

  const updateValueRange = (value: minMaxValue) => updateWithDelay({ ...legend, type: "range", value: value })

  return (
    <Stack mt="sm" key={legend.uuid}>
      <Group grow>
        <InputText label="Label" placeholder="label on legend" value={legend.label} onChange={updateLabel} />
        <InputColor color={legend.color} onChange={updateColor} />
      </Group>
      <Group>

        <Group>
          <Tooltip label={legend.hidden ? "show in legend" : "hide from legend"}>
            <ActionIcon variant="filled" color={legend.hidden ? "gray" : "teal"} onClick={toggleHidden}>
              {legend.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
            </ActionIcon>
          </Tooltip>

          <Tooltip label="delete this legend">
            <ActionIcon color="red" variant="filled" onClick={() => onDelete(legend)}>
              <Trash size={14} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <Tooltip label="set value type to compare with the data">
          <SegmentedControl
            value={legend.type}
            onChange={updateType}
            size="xs"
            data={[{ value: 'single', label: "Single", }, { value: 'range', label: "Range", },]}
          />
        </Tooltip>

        {legend.type === "single" && <InputText value={legend.value} placeholder="value" onChange={updateValueText} />}

        {legend.type === "range" && <InputMinMax value={legend.value} onChange={updateValueRange} />}

      </Group>
      <Divider mt={0} mb={0} />
    </Stack>
  )
}


export const LegendList = () => {
  const legends = useStore(state => state.legends)

  const updateLegend = useStore.getState().updateLegend

  const deleteLegend = useStore.getState().deleteLegend

  const debounceUpdate = useDebounce(updateLegend, 200)
  
  if (legends.length === 0) return null

  return (
    <>
      {legends.map(item => <Item
        key={item.uuid}
        item={item}
        onUpdate={legend => updateLegend(item.uuid, legend)}
        onDelete={() => deleteLegend(item.uuid)}
        onUpdateEnd={legend => debounceUpdate(item.uuid, legend)}
      />)}
    </>
  )
}