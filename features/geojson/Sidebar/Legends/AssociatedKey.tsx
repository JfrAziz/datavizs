import { Options } from "@components/Options"
import { useStore } from "@geojson/store"
import { Select } from "@mantine/core"

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
    <Options title="Associated Key" description="Select key where the legend value will be applied">
      <Select
        size="xs"
        searchable
        data={keys}
        value={selectedKey}
        onChange={setSelectedKey}
        disabled={keys.length === 0}
      />
    </Options>
  )
}