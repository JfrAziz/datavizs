import { useState } from "react";
import { useStore } from "@geojson/store";
import { Divider } from "@components/Divider";
import { useDebounce } from "@lib/utils/debounce";
import { showNotification } from "@mantine/notifications";
import { Legend, minMaxValue } from "@geojson/store/types";
import { InputColor, InputNumber, InputText } from "@components/Input";
import {
  Eye,
  Plus,
  Eraser,
  Trash,
  EyeOff,
  Palette,
  ArrowsSort,
  ChevronDown,
  ArrowNarrowUp,
  ArrowNarrowDown,
} from "tabler-icons-react";
import {
  Menu,
  Group,
  Stack,
  Select,
  Button,
  Tooltip,
  ActionIcon,
  ColorSwatch,
  createStyles,
  SegmentedControl,
} from "@mantine/core";



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

  onMove: (offset: number) => void
}

const LegendItem = ({ item, onDelete, onUpdate, onUpdateEnd, onMove }: LegendItemProps) => {

  const updateWithDelay = (value: Legend) => onUpdateEnd ? onUpdateEnd(value) : onUpdate(value)

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
    <>
      <Group mb="sm" noWrap align="stretch">
        <Stack style={{ flex: 1 }}>
          <Group>
            <InputText label="Label" placeholder="label on legend" value={item.label} onChange={updateLabel} />
            <InputColor label="Color" color={item.color} onChange={updateColor} format="rgba" />
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
        </Stack>
        <Divider style={{ marginBottom: 0 }} orientation="vertical" />
        <Group align="flex-end">
          <Stack >
            <Tooltip label="delete this legend">
              <ActionIcon mb={3.5} color="red" variant="filled" onClick={() => onDelete(item)}>
                <Trash size={14} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={item.hidden ? "show this legend" : "hide this legend"}>
              <ActionIcon mb={2} variant="filled" color={item.hidden ? "gray" : "teal"} onClick={toggleHidden}>
                {item.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
              </ActionIcon>
            </Tooltip>
          </Stack>
          <Stack>
            <ActionIcon mb={3.5} variant="filled" onClick={() => onMove(-1)}>
              <ArrowNarrowUp size={14} />
            </ActionIcon>
            <ActionIcon mb={2} variant="filled" onClick={() => onMove(1)}>
              <ArrowNarrowDown size={14} />
            </ActionIcon>
          </Stack>
        </Group>
      </Group>
      <Divider mt={0} mb={0} />
    </>
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

  const sortLegend = useStore.getState().sortLegend

  const resetLegends = useStore.getState().resetLegends

  const generateGradient = useStore.getState().generateGradient

  const generateQuantileLegends = useStore.getState().generateQuantileLegends


  const updateFeatureColor = () => {
    if (!selectedKey) return showNoKeyWarning();

    return useStore.getState().syncFeatureWithLegend(selectedKey, legends)
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
            <ActionIcon variant="filled" size={30} color={theme.primaryColor} className={classes.button} onClick={addLegends}  >
              <Plus size={14} />
            </ActionIcon>
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
        <Menu>
          <Menu.Target>
            <ActionIcon variant="filled" size={30}>
              <ArrowsSort size={14} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => sortLegend("label", "asc")}>Sort by label (asc)</Menu.Item>
            <Menu.Item onClick={() => sortLegend("label", "desc")}>Sort by label (desc)</Menu.Item>
            <Menu.Item onClick={() => sortLegend("value", "asc")}>Sort by value (asc)</Menu.Item>
            <Menu.Item onClick={() => sortLegend("value", "desc")}>Sort by label (desc)</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Tooltip label="Make gradient colors from the first to the last color">
          <ActionIcon color="violet.7" variant="filled" onClick={generateGradient}>
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
    <Group position="center" spacing="xs" mt={20} mb={10}>
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

  const moveLegend = useStore.getState().moveLegend

  const debounceUpdate = useDebounce(updateLegend, 200)

  return (
    <>
      <LegendListControl />
      <ColorSwatchs />
      {legends.map((item, index) => (
        <LegendItem
          item={item}
          key={item.uuid}
          onDelete={() => deleteLegend(item.uuid)}
          onMove={offset => moveLegend(index, index + offset)}
          onUpdate={legend => updateLegend(item.uuid, legend)}
          onUpdateEnd={legend => debounceUpdate(item.uuid, legend)}
        />
      ))}
    </>
  )
}