import { Select } from "@mantine/core"
import { useStore } from "@geojson/store"
import { Settings } from "@components/Settings"

/**
 * Select where Legend value will be applied
 * 
 * @returns 
 */
export const AssociatedKey = () => {
  const selectedKey = useStore(state => state.associatedKey)

  const keys = useStore(state => state.propertiesKeys)

  const setSelectedKey = useStore.getState().updateAssociatedKey

  return (
    <Settings title="Associated Key" description="Select key where the legend value will be applied">
      <Select
        size="xs"
        searchable
        data={keys}
        value={selectedKey}
        onChange={setSelectedKey}
        disabled={keys.length === 0}
      />
    </Settings>
  )
}