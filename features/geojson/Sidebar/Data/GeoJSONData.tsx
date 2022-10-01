import { useStore } from "@geojson/store";
import { useCallback, useState } from "react";
import { FeatureExtended } from "@geojson/store/types";
import { showNotification } from "@mantine/notifications";
import { DataTable, useDataTable } from "@components/DataTable";
import { DeviceFloppy, Plus, Search, Trash } from "tabler-icons-react";
import { ActionIcon, createStyles, Group, Text, TextInput, Tooltip } from "@mantine/core";
import { EditableGridCell, GridCell, GridCellKind, Item } from "@glideapps/glide-data-grid";


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

interface GeoJSONDataProps {
  features: FeatureExtended[]

  columns: string[]
}


const GeoJSONData = ({ features, columns: columnNames }: GeoJSONDataProps) => {
  const { classes } = useStyles()

  const [newKey, setNewKey] = useState<string>("")

  const {
    rows,
    columns,
    showSearch,
    toggleSearch,
    getSelection,
    gridSelection,
    onColumnResize,
    setGridSelection,
  } = useDataTable(columnNames, features.length)

  /**
   * table cell getter to get data from geoJSON properties
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

  /**
   * table handler to change value to geoJSON properties 
   */
  const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
    const [col, row] = cell;

    const uuid = features[row].uuid

    const keyName = columnNames[col];

    useStore.getState().updateFeatureProperties(uuid, {
      ...features[row].properties,
      [keyName]: newValue.data
    })
  }, [columnNames, features]);


  /**
   * save current data to geoJSON files
   * 
   * @returns
   */
  const downloadToGeoJSON = () => {
    const blob = new Blob([useStore.getState().downloadGeoJSON()], { type: 'text/plain' })
    return window.URL.createObjectURL(blob)
  }

  /**
   * create a new key from input
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

    useStore.getState().addPropertiesKey(newKey)
    setNewKey("")
  }

  /**
   * delete from selection, either by column or by rows
   * 
   * @returns
   */
  const deleteSelection = () => {
    const selection = getSelection()

    if (!selection) return showNotification({
      title: "Error",
      message: "No columns or row selected",
      color: "red"
    });

    if (selection.type === "column") {
      const selectedColumn = columnNames.filter((item, idx) => selection.data.includes(idx))

      useStore.getState().deletePropertiesKeys(selectedColumn)

      showNotification({
        title: "Success",
        message: `${selectedColumn} has been deleted`,
        color: "teal"
      })
    }

    if (selection.type === "row") {
      const uuids = features
        .filter((item, idx) => selection.data.includes(idx))
        .map(item => item.uuid)

      useStore.getState().deleteFeaturebyUUIDs(uuids)

      showNotification({
        title: "Success",
        message: `${uuids.length} data deleted`,
        color: "teal"
      })
    }

    return setGridSelection(undefined)
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
            <ActionIcon variant="filled" onClick={toggleSearch}>
              <Search size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip position="bottom" label="Delete Selected Row / Column">
            <ActionIcon variant="filled" color="red" onClick={deleteSelection}>
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
      <DataTable
        rows={rows}
        columns={columns}
        showSearch={showSearch}
        onSearchClose={toggleSearch}
        getCellContent={getContent}
        onCellEdited={onCellEdited}
        onColumnResize={onColumnResize}
        gridSelection={gridSelection}
        onGridSelectionChange={setGridSelection}
      />
    </>
  )
}

export default GeoJSONData
