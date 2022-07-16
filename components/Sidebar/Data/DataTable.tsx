import { useCallback, useEffect, useState } from "react";
import { Button, useMantineTheme } from "@mantine/core";
import { ThemeProvider } from "styled-components";
import { useGeoJSONStore } from "@store/geoJSONStore";
import DataEditor, { EditableGridCell, GridCell, GridCellKind, GridColumn, GridSelection, Item, useCustomCells } from "@glideapps/glide-data-grid";


const DataTable = () => {
  const [gridSelection, setGridSelection] = useState<GridSelection | undefined>(undefined)
  const theme = useMantineTheme()
  const features = useGeoJSONStore(state => state.features)
  const updateFeatureByUUID = useGeoJSONStore(state => state.updateFeatureByUUID)
  const deleteFeaturebyUUIDs = useGeoJSONStore(state => state.deleteFeaturebyUUIDs)

  const columnNames = Object.keys(features[0].properties).filter(key => key !== "uuid")
  const columns: GridColumn[] = columnNames.map((keyName) => ({ title: keyName, id: keyName }))

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

  const getSelectedIndex = () : number[] => {
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

  const handleDeleteSelection = () => {
    const selectedIdx = getSelectedIndex()

    const uuids = features.filter((item, idx) => selectedIdx.includes(idx)).map(item => item.properties.uuid)

    setGridSelection(undefined)

    deleteFeaturebyUUIDs(uuids)
  }

  const getTheme = () => {
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

  return (
    <>
      <Button onClick={() => handleDeleteSelection()}>Delete rows</Button>
      <ThemeProvider theme={getTheme()}>
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
          keybindings={{ search: true }}
        />
        <div id="portal" style={{ position: "fixed", left: 0, right: 0, top: 0, zIndex: 9999 }} />
      </ThemeProvider>
    </>
  )
}

export default DataTable

