import { useStore } from "@stores/maps";
import { useCallback, useState } from "react";
import { ThemeProvider } from "styled-components";
import { DeviceFloppy, Search, Trash } from "tabler-icons-react";
import { ActionIcon, Group, MantineTheme, Tooltip, useMantineTheme } from "@mantine/core";
import DataEditor, { EditableGridCell, GridCell, GridCellKind, GridColumn, GridSelection, Item } from "@glideapps/glide-data-grid";


/* 
|
| function for geneate table theme, based on mantine theme
| this will change a lot of default color used in glide-data-grid
|
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
  const theme = useMantineTheme()
  const features = useStore(state => state.features)
  const columnNames = useStore(state => state.propertiesKeys)
  const deletePropertiesKey = useStore.getState().deletePropertiesKey
  const updateFeatureByUUID = useStore.getState().updateFeatureByUUID
  const deleteFeaturebyUUIDs = useStore.getState().deleteFeaturebyUUIDs

  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [gridSelection, setGridSelection] = useState<GridSelection | undefined>(undefined)

  const columns: GridColumn[] = columnNames.map((keyName) => ({ title: keyName, id: keyName }))

  /* 
  |
  | table cell getter and setter, for get and delete a value in the table
  |
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
  }, [features]);

  const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
    const [col, row] = cell;

    const uuid = features[row].properties.uuid
    const keyName = columnNames[col];
    updateFeatureByUUID(uuid, { ...features[row].properties, [keyName]: newValue.data })
  }, [features]);


  /* 
  |
  | custom function for deletion by row and by column, then the button just 
  | call the action to check column or row to be deleted.
  |
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
      if (selectedColumn) return deletePropertiesKey(selectedColumn)
    }

    if (gridSelection.rows.last() !== undefined) {
      const selectedIdx = getSelectedRowIndex()

      const uuids = features.filter((item, idx) => selectedIdx.includes(idx)).map(item => item.properties.uuid)

      setGridSelection(undefined)

      deleteFeaturebyUUIDs(uuids)
    }
  }

  /* 
  |
  | save a current geoJSON and it's properties to file
  |
  */
  const downloadToGeoJSON = () => {
    const blob = new Blob([JSON.stringify({ type: "FeatureCollection", features: features })], { type: 'text/plain' })
    return window.URL.createObjectURL(blob)
  }

  return (
    <>
      <Group mb={10} position="apart">
        <div>
          Feature Properties
        </div>
        <Group>
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
        </Group>
      </Group>
      <ThemeProvider theme={getTheme(theme)}>
        <DataEditor
          getCellContent={getContent}
          onCellEdited={onCellEdited}
          columns={columns}
          rows={features.length}
          onPaste={true}
          getCellsForSelection={true}
          columnSelect="multi"
          gridSelection={gridSelection}
          onGridSelectionChange={(newValue) => setGridSelection(newValue)}
          rowSelectionMode="multi"
          rowSelect="multi"
          rowMarkers="both"
          width="100%"
          minColumnWidth={200}
          showSearch={showSearch}
          onSearchClose={() => setShowSearch(!showSearch)}
          keybindings={{ search: true }}
        />
        <div id="portal" style={{ position: "fixed", left: 0, right: 0, top: 0, zIndex: 9999 }} />
      </ThemeProvider>
    </>
  )
}

export default DataTable

