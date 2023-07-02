import type { Column } from "./types"
import { FC, useCallback } from "react"
import { Button, Text } from "@mantine/core"
import { useDataTableTheme } from "./themes"
import { AddColumnMenu, HeaderMenu } from "./header-menu"
import { IconSearch, IconTrash } from "@tabler/icons-react"
import DataEditor, { Item, GridCell } from "@glideapps/glide-data-grid"
import { createNumberCell, createTextCell, createIdCell } from "./utils"
import {
  useDTSearch,
  useHeaderMenu,
  useDTWriteHandler,
  useDTColumnHandler,
  DataTablesWriteConfig,
} from "./hooks"

interface DataTableBaseProps {
  _id: string
  data: any[]
  title?: string
  columns: Column[]
}

interface DataTableAdditionalProps {
  search?: true
}

type DataTableProps = DataTableBaseProps &
  DataTableAdditionalProps &
  DataTablesWriteConfig

/**
 * Custom Datatable from DataGrid with mantine theme
 *
 * @param props
 * @returns
 */
export const DataTable: FC<DataTableProps> = ({
  _id,
  data,
  title,
  columns,
  search,
  edit,
  sort,
  remove,
  createRow,
  createColumn,
}) => {
  /**
   * search hooks to handle search menu
   */
  const { showSearch, toggleSearch } = useDTSearch()

  /**
   * data write and deletion handlers
   */
  const {
    onCellEdited,
    onRowCreated,
    onColumnCreated,
    onSelectionDeleted,
    selection,
    gridSelection,
    setGridSelection,
  } = useDTWriteHandler(data, {
    _id,
    columns,
    sort,
    edit,
    remove,
    createRow,
    createColumn,
  })

  /**
   * column hooks to handle column transofrmation and resizing
   */
  const { columns: dtColumns, onColumnResize } = useDTColumnHandler(
    columns,
    onSelectionDeleted !== undefined || sort !== undefined
  )

  /**
   * props to handle header menu components (just sort and delete menu)
   */
  const {
    open,
    openHeaderMenu,
    onColumnSorted,
    onColumnDeleted,
    headerMenuProps,
  } = useHeaderMenu(columns, { remove, sort })

  /**
   * get content component to get value for each cell
   * do not remove optional chaining, idk this is strange
   */
  const getContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell

      const colCell = columns[col]

      const colName = colCell?.name

      const rowCell = data[row][colName]

      if (colCell?.type === "id") return createIdCell(rowCell)

      if (colCell?.type === "number") return createNumberCell(rowCell)

      return createTextCell(rowCell)
    },
    [columns, data]
  )

  const { theme } = useDataTableTheme()

  return (
    <div className="flex w-full flex-col p-1" title={title}>
      {(onSelectionDeleted || search || title) && (
        <div className="flex flex-row items-center justify-between">
          <div className="font-semibold">{title}</div>
          <div className="space-x-2">
            {onSelectionDeleted !== undefined && selection && (
              <Button
                size="xs"
                color="red"
                className="mb-2"
                onClick={onSelectionDeleted}
                title="Delete Selected Row/Column"
                leftSection={<IconTrash className="h-4 w-4" />}
              >
                <Text size="xs">Delete Selected</Text>
              </Button>
            )}
            {search && (
              <Button
                size="xs"
                className="mb-2"
                onClick={toggleSearch}
                title="Open Search Menu"
                leftSection={<IconSearch className="h-4 w-4" />}
              >
                <Text size="xs">Search</Text>
              </Button>
            )}
          </div>
        </div>
      )}
      <DataEditor
        // default props
        width="100%"
        theme={theme}
        rows={data.length}
        columns={dtColumns}
        smoothScrollY={true}
        smoothScrollX={true}
        getCellContent={getContent}
        onColumnResize={onColumnResize}
        className="border dark:border-gray-700"
        {...((onColumnDeleted || onColumnSorted) && {
          onHeaderMenuClick: openHeaderMenu,
        })}
        // search props
        {...(search && {
          showSearch: showSearch,
          onSearchClose: toggleSearch,
        })}
        // write props
        {...(onCellEdited !== undefined && {
          onPaste: true,
          onCellEdited: onCellEdited,
        })}
        // create new data (row or columns)
        {...(onRowCreated !== undefined && {
          onRowAppended: () => onRowCreated(),
          trailingRowOptions: {
            sticky: true,
            tint: true,
            hint: "Add",
          },
        })}
        {...(onColumnCreated !== undefined && {
          rightElementProps: {
            fill: true,
            sticky: false,
          },
          rightElement: <AddColumnMenu onColumnCreated={onColumnCreated} />,
        })}
        // select & delete props
        {...(onSelectionDeleted !== undefined && {
          rowSelect: "multi",
          rowMarkers: "both",
          rowSelectionMode: "multi",
          getCellsForSelection: true,
          gridSelection: gridSelection,
          onGridSelectionChange: setGridSelection,
        })}
      />
      <HeaderMenu
        open={open}
        onColumnSorted={onColumnSorted}
        onColumnDeleted={onColumnDeleted}
        {...headerMenuProps}
      />
      <div id="portal" className="fixed inset-x-0 top-0 z-[999]" />
    </div>
  )
}
