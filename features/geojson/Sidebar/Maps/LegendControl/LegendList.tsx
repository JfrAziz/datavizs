import { useStore } from "@geojson/store";
import { Divider } from "@components/Divider";
import { useDebounce } from "@lib/utils/debounce";
import { InputColor, InputText } from "@components/Input";
import { Legend, minMaxValue } from "@geojson/store/types";
import { InputMinMax } from "@components/Input/InputMinMax";
import { Eye, Trash, EyeOff, ArrowNarrowUp, ArrowNarrowDown, } from "tabler-icons-react";
import { Group, Stack, Tooltip, ActionIcon, SegmentedControl, MediaQuery, } from "@mantine/core";


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
          <Group noWrap>
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
          <MediaQuery smallerThan={400} styles={{ display: "none" }}>
            <Stack>
              <ActionIcon mb={3.5} variant="filled" onClick={() => onMove(-1)}>
                <ArrowNarrowUp size={14} />
              </ActionIcon>
              <ActionIcon mb={2} variant="filled" onClick={() => onMove(1)}>
                <ArrowNarrowDown size={14} />
              </ActionIcon>
            </Stack>
          </MediaQuery>
        </Group>
      </Group>
      <Divider mt={0} mb={0} />
    </>
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