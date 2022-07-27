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
  Select,
  Button,
  Tooltip,
  TextInput,
  ActionIcon,
  ColorInput,
  ColorSwatch,
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

  return <ColorInput
    size="xs"
    format="hex"
    label="Color"
    value={value}
    sx={{ flex: 1 }}
    onChange={updateColor}
    rightSection={<RandomButton />}
  />
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

  return <TextInput sx={{ flex: 1 }} {...others} size="xs" value={val} onChange={e => updateColor(e.target.value)} />
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

    if (onChange) return onChange(value)
  }

  return <NumberInput sx={{ flex: 1 }} size="xs" value={value} precision={precision} onChange={updateMinValue} {...others} />
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
interface LegendItemProps {
  item: Legend

  onUpdate: (legend: Legend) => void

  onUpdateEnd?: (legend: Legend) => void

  onDelete: (legend: Legend) => void
}

const LegendItem = ({ item, onDelete, onUpdate, onUpdateEnd }: LegendItemProps) => {
  const updateWithDelay = (value: Legend) => {
    if (onUpdateEnd) return onUpdateEnd(value)

    return onUpdate(value)
  }

  const updateColor = (color: string) => updateWithDelay({ ...item, color: color })

  const updateLabel = (label: string) => updateWithDelay({ ...item, label: label })

  const toggleHidden = () => onUpdate({ ...item, hidden: !item.hidden })

  const updateType = (type: "range" | "single") => {
    if (type === "single") return onUpdate({ ...item, type: "single", value: "" })

    return onUpdate({ ...item, type: type, value: { min: undefined, max: undefined } })
  }

  const updateValueText = (value: string) => updateWithDelay({ ...item, type: "single", value: value })

  const updateValueRange = (value: minMaxValue) => updateWithDelay({ ...item, type: "range", value: value })

  return (
    <Stack mt="sm" key={item.uuid}>
      <Group align="flex-end">
        <InputText label="Label" placeholder="label on legend" value={item.label} onChange={updateLabel} />
        <InputColor color={item.color} onChange={updateColor} />
        <Group>
          <Tooltip label={item.hidden ? "show in legend" : "hide from legend"}>
            <ActionIcon variant="filled" color={item.hidden ? "gray" : "teal"} onClick={toggleHidden}>
              {item.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
            </ActionIcon>
          </Tooltip>

          <Tooltip label="delete this legend">
            <ActionIcon color="red" variant="filled" onClick={() => onDelete(item)}>
              <Trash size={14} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <Group>

        <Tooltip label="set value type to compare with the data">
          <SegmentedControl
            value={item.type}
            onChange={updateType}
            size="xs"
            data={[{ value: 'single', label: "Single", }, { value: 'range', label: "Range", },]}
          />
        </Tooltip>

        {item.type === "single" && <InputText value={item.value} placeholder="value" onChange={updateValueText} />}

        {item.type === "range" && <InputMinMax value={item.value} onChange={updateValueRange} />}

      </Group>
      <Divider mt={0} mb={0} />
    </Stack>
  )
}

/**
 * Header Button to add a new legend, reset current legends, and 
 * generate gradient from available color in the legend
 * 
 * @returns JSX
 */
const HeaderButton = () => {
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


/**
 * Footer contains properties keys selection to apply color based on value
 * in the legends. This will update all features
 * 
 * @returns JSX
 */
const FooterButton = () => {
  const legends = useStore(state => state.legends)

  const keys = useStore(state => state.propertiesKeys)

  const applyColor = useStore.getState().updateFeatureColor

  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const updateFeatureColor = () => {
    if (!selectedKey) return;

    return applyColor(selectedKey, legends)
  }

  if (!legends.length) return null

  return (
    <Group position="apart" my={20} align="flex-end">
      <Select
        size="xs"
        searchable
        data={keys}
        value={selectedKey}
        onChange={setSelectedKey}
        label="Select key to apply the color"
      />
      <Button size="xs" onClick={updateFeatureColor}>Apply Color</Button>
    </Group>
  )
}

/**
 * Color swatch to display all colors in legends
 * 
 * @returns JSX
 */
const ColorSwatchs = () => {
  const legends = useStore(state => state.legends)

  return (
    <Group position="center" spacing="xs">
      {legends.map((legend, idx) => <ColorSwatch key={idx} color={legend.color} />)}
    </Group>
  )
}


/**
 * Combine all component above
 * 
 * @returns JSX
 */
export const LegendList = () => {
  const legends = useStore(state => state.legends)

  const updateLegend = useStore.getState().updateLegend

  const deleteLegend = useStore.getState().deleteLegend

  const debounceUpdate = useDebounce(updateLegend, 200)

  return (
    <>
      <HeaderButton />
      <ColorSwatchs />
      {legends.map(item => (
        <LegendItem
          item={item}
          key={item.uuid}
          onDelete={() => deleteLegend(item.uuid)}
          onUpdate={legend => updateLegend(item.uuid, legend)}
          onUpdateEnd={legend => debounceUpdate(item.uuid, legend)}
        />
      ))}
      <FooterButton />
    </>
  )
}