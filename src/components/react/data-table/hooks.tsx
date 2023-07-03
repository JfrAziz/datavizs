import type { Column } from "./types"
import { createColumn } from "./utils"
import { useState, useEffect, useCallback, useMemo } from "react"
import {
  offset,
  useRole,
  useClick,
  autoUpdate,
  useDismiss,
  useFloating,
  useClientPoint,
  useInteractions,
} from "@floating-ui/react"
import type {
  Item,
  Rectangle,
  GridColumn,
  GridSelection,
  EditableGridCell,
} from "@glideapps/glide-data-grid"

/**
 * data tables selection hooks, to handle active selection state
 *
 * @returns
 */
export const useDTSelection = () => {
  interface SelectionObject {
    type: "column" | "row"
    data: number[]
  }

  const [gridSelection, setGridSelection] = useState<
    GridSelection | undefined
  >()

  /**
   * get selection either by columns or rows, and also return the all selected index
   *
   * @returns
   */
  const selection = useMemo<SelectionObject | undefined>(() => {
    if (gridSelection === undefined) return

    if (gridSelection.columns.last() !== undefined) {
      return { type: "column", data: gridSelection.columns.toArray() }
    }

    if (gridSelection.rows.last() !== undefined) {
      return { type: "row", data: gridSelection.rows.toArray() }
    }
  }, [gridSelection])

  return {
    selection,
    gridSelection,
    setGridSelection,
  }
}

/**
 * data tables search featurs
 *
 * @returns
 */
export const useDTSearch = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false)

  /**
   * show or hide search menu on the table
   *
   * @returns void
   */
  const toggleSearch = () => setShowSearch(!showSearch)

  return { showSearch, toggleSearch }
}

/**
 * handle column state for datatables
 *
 * @param columns Column[]
 * @returns
 */
export const useDTColumnHandler = (
  columns: Column[],
  menu: boolean = false
) => {
  const [cols, setColumns] = useState<GridColumn[]>(
    columns.map((item) => createColumn(item, menu))
  )

  /**
   * update columns when cols params change
   *
   */
  useEffect(() => {
    setColumns(columns.map((item) => createColumn(item, menu)))
  }, [columns, menu])

  /**
   * resize column size function
   *
   */
  const onColumnResize = useCallback((column: GridColumn, newSize: number) => {
    setColumns((prev) => {
      const index = prev.findIndex((col) => col.id === column.id)
      const newColumns = [...prev]
      newColumns.splice(index, 1, {
        ...prev[index],
        width: newSize,
      })
      return newColumns
    })
  }, [])

  return { columns: cols, onColumnResize }
}

/**
 * Config to handle write to the data
 */
export interface DataTablesWriteConfig {
  /**
   * what column name to identify any row.
   */
  _id?: string
  /**
   * list all column from the data
   */
  columns: Column[]
  /**
   * a function to update row by it's id
   *
   * @param _id row id
   * @param data edited row
   * @returns
   */
  edit?: (_id: string, data: any) => void

  /**
   * function to create a new column
   *
   * @param column
   * @returns
   */
  createColumn?: (column: Column) => void

  /**
   * function to create a new row
   *
   * @returns
   */
  createRow?: () => void
  /**
   * function to bulk delete the data, either by columns or rows
   *
   * @param type "column" | "row"
   * @param data either column name list or row id list
   * @returns
   */
  remove?: (type: "column" | "row", data: string[]) => void // data is either column name list or row id list
  /**
   * sort by column, ascending or descending
   *
   * @param column
   * @param type
   * @returns
   */
  sort?: (column: string, type: "asc" | "desc") => void
}

/**
 * custom hooks to handle create, write, and delete the data
 *
 * @param data
 * @param config DataTablesWriteConfig
 * @returns
 */
export const useDTWriteHandler = (
  data: any[],
  config: DataTablesWriteConfig
) => {
  const { _id, columns, createColumn, createRow, edit, remove } = config

  const isEditable = edit !== undefined

  const isRowCreatable = createRow !== undefined

  const isColumnCreatable = createColumn !== undefined

  const isDeletable = remove !== undefined

  const { selection, setGridSelection, gridSelection } = useDTSelection()

  /**
   * called when edit the cell
   */
  const onCellEdited = useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      if (!isEditable || !_id) return

      const [col, row] = cell

      const rowId = data[row][_id]

      const key = columns[col]

      return edit(rowId, { ...data[row], [key.name]: newValue.data })
    },
    [isEditable, data, _id, columns, edit]
  )

  /**
   * call this function to handle deletion
   *
   * @returns
   */

  const onSelectionDeleted = () => {
    if (!selection || !isDeletable || !_id) return

    if (selection.type === "column") {
      const selectedColumns = columns
        .filter((_, index) => selection.data.includes(index))
        .map((item) => item.name)

      remove("column", selectedColumns)
    }

    if (selection.type === "row") {
      const selectedIds = data
        .filter((_, index) => selection.data.includes(index))
        .map((item) => item[_id])

      remove("row", selectedIds)
    }

    return setGridSelection(undefined)
  }

  /**
   *
   * @returns
   */
  const onRowCreated = () => {
    if (!createRow) return

    return createRow()
  }

  const onColumnCreated = (column: Column) => {
    if (!createColumn) return

    return createColumn(column)
  }

  return {
    selection,
    gridSelection,
    setGridSelection,
    onRowCreated: isRowCreatable ? onRowCreated : undefined,
    onCellEdited: isEditable && _id ? onCellEdited : undefined,
    onColumnCreated: isColumnCreatable ? onColumnCreated : undefined,
    onSelectionDeleted: isDeletable && _id ? onSelectionDeleted : undefined,
  }
}

/**
 * header menu hooks to generate component props and callback open menu handles
 *
 * @param columns
 * @returns
 */
export const useHeaderMenu = (
  columns: Column[],
  config: Pick<DataTablesWriteConfig, "sort" | "remove"> = {}
) => {
  const [open, setOpen] = useState(false)

  const [menu, setMenu] = useState<{
    col: number
    bounds: Rectangle
  }>()

  /**
   * menu handlers function
   */
  const { sort, remove } = config

  const isSortable = sort !== undefined

  const isDeletable = remove !== undefined

  const onColumnSorted = (type: "asc" | "desc") => {
    if (!menu || !isSortable) return

    const currentColumn = columns[menu.col]

    sort(currentColumn.name, type)

    setMenu(undefined)

    setOpen(false)
  }

  const onColumnDeleted = () => {
    if (!menu || !isDeletable) return

    const currentColumn = columns[menu.col]

    remove("column", [currentColumn.name])

    setMenu(undefined)

    setOpen(false)
  }

  /**
   * floating menu handlers
   */
  const { refs, floatingStyles, context } = useFloating({
    open: open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset({ mainAxis: 40, crossAxis: -16 })],
  })

  const role = useRole(context)

  const click = useClick(context)

  const dismiss = useDismiss(context)

  const clientPoint = useClientPoint(context, {
    x: (menu?.bounds.x ?? 0) + (menu?.bounds.width ?? 0),
    y: menu?.bounds.y,
  })

  const { getFloatingProps } = useInteractions([
    role,
    click,
    dismiss,
    clientPoint,
  ])

  const headerMenuProps = {
    ref: refs.setFloating,
    style: floatingStyles,
    context: context,
    ...getFloatingProps(),
  }

  const openHeaderMenu = useCallback((col: number, bounds: Rectangle) => {
    setMenu({ col, bounds })
    setOpen(true)
  }, [])

  return {
    open,
    openHeaderMenu,
    headerMenuProps,
    onColumnSorted: isSortable ? onColumnSorted : undefined,
    onColumnDeleted: isDeletable ? onColumnDeleted : undefined,
  }
}
