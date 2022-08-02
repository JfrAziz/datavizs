import { useStore } from "@stores/maps";
import { randomColor } from "@utils/colors";
import { useEffect, useState } from "react";
import { useDebounce } from "@utils/debounce";
import { Legend, minMaxValue } from "@stores/maps/types";
import { Divider } from "@components/Sidebar/Common/Divider";
import { ChevronDown, Eraser, Eye, EyeOff, Palette, Plus, Refresh, Trash } from "tabler-icons-react";
import {
  Menu,
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
  createStyles,
  SegmentedControl,
  NumberInputProps,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";


const useStyles = createStyles(theme => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 2
  },
  section: {
    [theme.fn.smallerThan(theme.breakpoints.sm)]: {
      flexWrap: "wrap",

      "> div": {
        flexGrow: 1
      }
    },
  }
}))

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
      <InputNumber
        placeholder="min"
        value={rangeValue.min}
        onChange={(min) => updateValue({ max: rangeValue.max, min: min })} />
      <InputNumber
        placeholder="max"
        min={rangeValue.min}
        value={rangeValue.max}
        onChange={max => updateValue({ min: rangeValue.min, max: max })} />
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

  const updateValueText = (value: string) => updateWithDelay({ ...item, type: "single", value: value })

  const updateValueRange = (value: minMaxValue) => updateWithDelay({ ...item, type: "range", value: value })

  const updateType = (type: "range" | "single") => {
    if (type === "single") {
      const lastValue = item.type === "range" && item.value.min !== undefined ? item.value.min.toString() : ""

      return onUpdate({ ...item, type: "single", value: lastValue })
    }

    const lastValue = item.type === "single" && item.value && !Number.isNaN(Number(item.value)) ? Number(item.value) : undefined

    return onUpdate({ ...item, type: type, value: { min: lastValue, max: undefined } })
  }

  return (
    <Stack mt="sm" key={item.uuid}>
      <Group align="flex-end">
        <InputText label="Label" placeholder="label on legend" value={item.label} onChange={updateLabel} />
        <InputColor color={item.color} onChange={updateColor} />
        <Group>
          <Tooltip label={item.hidden ? "show this legend" : "hide this legend"}>
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
            size="xs"
            color="teal"
            value={item.type}
            onChange={updateType}
            data={[{ value: 'single', label: "Single", }, { value: 'range', label: "Range", },]}
          />
        </Tooltip>

        {item.type === "single" && <InputText value={item.value} onChange={updateValueText} placeholder="value" />}

        {item.type === "range" && <InputMinMax value={item.value} onChange={updateValueRange} />}
      </Group>
      <Divider mt={0} mb={0} />
    </Stack>
  )
}

const showNoKeyWarning = () => showNotification({
  title: "Warning",
  message: "Please select on of key from geoJSON",
  color: "yellow"
})

/**
 * Header Button to add a new legend, reset current legends, and 
 * generate gradient from available color in the legend
 * 
 * @returns JSX
 */
const LegendListControl = () => {
  const { classes, theme } = useStyles()

  const keys = useStore(state => state.propertiesKeys)

  const legends = useStore(state => state.legends)

  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const addLegends = useStore.getState().addLegends

  const resetLegends = useStore.getState().resetLegends

  const generateGradient = useStore.getState().generateGradient

  const generateQuantileLegends = useStore.getState().generateQuantileLegends

  const updateFeatureColor = () => {
    if (!selectedKey) return showNoKeyWarning();

    return useStore.getState().updateFeatureColor(selectedKey, legends)
  }

  const generateUniqueLegends = () => {

    if (!selectedKey) return showNoKeyWarning();

    return useStore.getState().generateUniqueLegends(selectedKey)
  }

  const quantileLegends = () => {
    if (!selectedKey) return showNoKeyWarning();

    return generateQuantileLegends(selectedKey, [0, 0.25, 0.5, 0.75, 1])
  }

  const quintileLegends = () => {
    if (!selectedKey) return showNoKeyWarning();

    return generateQuantileLegends(selectedKey, [0, 0.2, 0.4, 0.6, 0.8, 1])
  }

  const decileLegends = () => {
    if (!selectedKey) return showNoKeyWarning();

    return generateQuantileLegends(selectedKey, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
  }

  return (
    <Group noWrap position="apart" align="flex-end" className={classes.section}>
      <Select
        size="xs"
        searchable
        data={keys}
        value={selectedKey}
        label="Associated Key"
        onChange={setSelectedKey}
        disabled={keys.length === 0}
      />
      <Group position="right" noWrap style={{ justifyContent: "center" }}>
        <Group noWrap spacing={0}>
          <Tooltip label="Add legend">
            <Button size="xs" className={classes.button} onClick={addLegends}>
              <Plus size={14} />
            </Button>
          </Tooltip>
          <Menu>
            <Menu.Target>
              <ActionIcon variant="filled" size={30} color={theme.primaryColor} className={classes.menuControl}>
                <ChevronDown size={14} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={generateUniqueLegends}>Generate from unique value</Menu.Item>
              <Menu.Item onClick={quantileLegends}>Make from quartile (4 parts)</Menu.Item>
              <Menu.Item onClick={quintileLegends}>Make from quintile (5 parts)</Menu.Item>
              <Menu.Item onClick={decileLegends}>Make from decile (10 parts)</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Tooltip label="Apply to key">
          <Button size="xs" onClick={updateFeatureColor} disabled={selectedKey === null}>Apply</Button>
        </Tooltip>
        <Tooltip label="Make gradient colors from the first to the last color">
          <ActionIcon color="grape" variant="filled" onClick={generateGradient}>
            <Palette size={14} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Clear all legends">
          <ActionIcon color="red" variant="filled" onClick={resetLegends}>
            <Eraser size={14} />
          </ActionIcon>
        </Tooltip>
      </Group>
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
    <Group position="center" spacing="xs" mt={20}>
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
      <LegendListControl />
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
    </>
  )
}