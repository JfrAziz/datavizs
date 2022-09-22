import { Select } from "@mantine/core"
import { useStore } from "@geojson/store"
import { Settings } from "@components/Settings"

/**
 * Select where Legend value will be applied
 * 
 * @returns 
 */
export const LegendKey = () => {
  const selectedKey = useStore(state => state.legendKey)

  const keys = useStore(state => state.propertiesKeys)

  const setSelectedKey = useStore.getState().updateLegendKey

  return (
    <Settings title="Legend Key" description="Select column where the legend value will be applied">
      <Select
        size="xs"
        searchable
        value={selectedKey}
        onChange={setSelectedKey}
        disabled={keys.length === 0}
        data={keys.filter(key => key !== "color")}
      />
    </Settings>
  )
}