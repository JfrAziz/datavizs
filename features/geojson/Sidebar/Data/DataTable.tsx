import { useStore } from "@geojson/store";
import { useCallback, useState } from "react";
import "@glideapps/glide-data-grid/dist/index.css";
import { showNotification } from "@mantine/notifications";
import { DeviceFloppy, Plus, Search, Trash } from "tabler-icons-react";
import { ActionIcon, createStyles, Group, MantineTheme, Text, TextInput, Tooltip } from "@mantine/core";
import DataEditor, { EditableGridCell, GridCell, GridCellKind, GridColumn, GridSelection, Item } from "@glideapps/glide-data-grid";


const useStyles = createStyles({
  inputGroup: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    maxWidth: 150,
  },
  buttonGroup: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: 2
  }
})

/**
 * function for geneate table theme, based on mantine theme
 * this will change a lot of default color used in glide-data-grid
 * 
 * @param theme 
 * @returns 
 */
const getTheme = (theme: MantineTheme) => {
  if (theme.colorScheme === 'dark') {
    return {
      bgCell: theme.colors.dark[6],
      bgHeader: theme.colors.dark[5],
      bgHeaderHasFocus: theme.colors.dark[6],
      bgHeaderHovered: theme.colors.dark[6],
      textDark: theme.colors.gray[2],
      textHeader: theme.colors.gray[2],
      accentColor: theme.colors.teal[8],
      accentFg: theme.colors.teal[8],
      accentLight: theme.colors.dark[5],
      bgSearchResult: theme.colors.gray[8]
    }
  }

  return {
    bgCell: theme.colors.gray[1],
    bgHeader: theme.colors.gray[0],
    bgHeaderHasFocus: theme.colors.gray[3],
    bgHeaderHovered: theme.colors.gray[3],
    textDark: theme.colors.dark[6],
    textHeader: theme.colors.dark[6],
    accentColor: theme.colors.teal[6],
    accentFg: theme.colors.teal[6],
    accentLight: theme.colors.gray[3],
    bgSearchResult: theme.colors.teal[1],
  }
}


const DataTable = () => {
  const { classes, theme } = useStyles()
  const features = useStore(state => state.features)
  const columnNames = useStore(state => state.propertiesKeys)
  const addPropertiesKey = useStore.getState().addPropertiesKey
  const deletePropertiesKey = useStore.getState().deletePropertiesKey
  const updateFeatureByUUID = useStore.getState().updateFeatureByUUID
  const deleteFeaturebyUUIDs = useStore.getState().deleteFeaturebyUUIDs

  const [newKey, setNewKey] = useState<string>("")
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [gridSelection, setGridSelection] = useState<GridSelection | undefined>(undefined)

  // const [columns, setColumn] = useState<GridColumn[]>(columnNames.map((keyName) => ({ title: keyName, id: keyName })))

  const columns: GridColumn[] = columnNames.map((keyName) => ({ title: keyName, id: keyName }))


  /**
   * table cell getter and setter, for get and delete a value in the table
   */
  const getContent = useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const rowCell = features[row].properties[columnNames[col]]

    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      readonly: false,
      displayData: rowCell ? rowCell.toString() : "",
      data: rowCell,
    };
  }, [columnNames, features]);

  const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
    const [col, row] = cell;

    const uuid = features[row].properties.uuid
    const keyName = columnNames[col];
    updateFeatureByUUID(uuid, { ...features[row].properties, [keyName]: newValue.data })
  }, [columnNames, features, updateFeatureByUUID]);


  /**
   * custom function for deletion by row and by column, then the button just 
   * call the action to check column or row to be deleted.
   * 
   * @returns 
   */
  const getSelectedRowIndex = (): number[] => {
    if (!gridSelection || !gridSelection.rows.length) return []

    const firstIdx = gridSelection.rows.first()
    const lastIndesx = gridSelection.rows.last()

    if (firstIdx === undefined || lastIndesx === undefined) return []

    if (firstIdx === lastIndesx) return [firstIdx]

    const selectedIdx = []

    for (let index = firstIdx; index <= lastIndesx; index++) {
      if (gridSelection.rows.hasIndex(index)) selectedIdx.push(index)
    }

    return selectedIdx
  }

  const getSelectedColumn = (): string | undefined => {
    if (gridSelection === undefined) return

    const columnIdx = gridSelection.columns.last()

    if (columnIdx === undefined) return

    return columnNames[gridSelection?.columns?.last() as number]
  }

  const handleDeleteSelection = () => {
    if (gridSelection === undefined) return

    if (gridSelection.columns.last() !== undefined) {
      const selectedColumn = getSelectedColumn()

      if (selectedColumn) {
        deletePropertiesKey(selectedColumn)

        return showNotification({
          title: "Success",
          message: `${selectedColumn} has been deleted`,
          color: "teal"
        })
      }
    }

    if (gridSelection.rows.last() !== undefined) {
      const selectedIdx = getSelectedRowIndex()

      const uuids = features.filter((item, idx) => selectedIdx.includes(idx)).map(item => item.properties.uuid)

      setGridSelection(undefined)

      deleteFeaturebyUUIDs(uuids)

      return showNotification({
        title: "Success",
        message: `${uuids.length} data deleted`,
        color: "teal"
      })
    }
  }


  /**
   * save a current geoJSON and it's properties to file
   * 
   * @returns 
   */
  const downloadToGeoJSON = () => {
    const blob = new Blob([JSON.stringify({ type: "FeatureCollection", features: features })], { type: 'text/plain' })
    return window.URL.createObjectURL(blob)
  }

  /**
   * create a new key base on user input
   * 
   * @returns 
   */
  const createNewKey = () => {
    if (!newKey) return showNotification({
      title: "Error",
      message: "please input a new key name",
      color: "red"
    })

    if (columnNames.includes(newKey)) return showNotification({
      title: "Error",
      message: "please input another name",
      color: "red"
    })

    addPropertiesKey(newKey)
    setNewKey("")
  }

  return (
    <>
      <Group mb={10} position="apart">
        <Text>
          GeoJSON
        </Text>
        <Group position="right">
          <Tooltip position="bottom" label="Save to GeoJSON">
            <ActionIcon component="a" color="teal" download="export.geojson" variant="filled" href={downloadToGeoJSON()}>
              <DeviceFloppy size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip position="bottom" label="Open Search Menu">
            <ActionIcon variant="filled" onClick={() => setShowSearch(!showSearch)}>
              <Search size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip position="bottom" label="Delete Selected Row / Column">
            <ActionIcon variant="filled" color="red" onClick={() => handleDeleteSelection()}>
              <Trash size={16} />
            </ActionIcon>
          </Tooltip>
          <Group spacing={0}>
            <TextInput value={newKey} onChange={e => setNewKey(e.target.value)} size="xs" placeholder="new key" classNames={{ input: classes.inputGroup }} />
            <Tooltip position="bottom" label="Save to GeoJSON">
              <ActionIcon color="teal" variant="filled" onClick={createNewKey} className={classes.buttonGroup}>
                <Plus size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Group>
      <DataEditor
        width="100%"
        onPaste={true}
        rowSelect="multi"
        rowMarkers="both"
        columns={columns}
        minColumnWidth={200}
        smoothScrollX={true}
        smoothScrollY={true}
        columnSelect="single"
        rows={features.length}
        showSearch={showSearch}
        theme={getTheme(theme)}
        rowSelectionMode="multi"
        getCellContent={getContent}
        onCellEdited={onCellEdited}
        getCellsForSelection={true}
        gridSelection={gridSelection}
        keybindings={{ search: true }}
        onSearchClose={() => setShowSearch(!showSearch)}
        onGridSelectionChange={(newValue) => setGridSelection(newValue)}
      />
      <div id="portal" style={{ position: "fixed", left: 0, right: 0, top: 0, zIndex: 9999 }} />
    </>
  )
}

export default DataTable

