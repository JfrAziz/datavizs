import { Select } from "@mantine/core"
import { useStore } from "@geojson/store"
import { Settings } from "@components/Settings"

/**
 * Select where Legend value will be applied
 * 
 * @returns 
 */
export const LegendKey = () => {
  const settings = useStore(state => state.legendSettings)

  const keys = useStore(state => state.propertiesKeys)

  const setSelectedKey = (key: string) => useStore.getState().updateLegendSettings({ key: key })

  return (
    <Settings title="Legend Key" description="Select column where the legend value will be applied">
      <Select
        size="xs"
        searchable
        value={settings.key}
        onChange={setSelectedKey}
        disabled={keys.length === 0}
        data={keys.filter(key => key !== "color")}
      />
    </Settings>
  )
}