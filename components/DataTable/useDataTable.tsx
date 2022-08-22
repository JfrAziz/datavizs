import { useCallback, useEffect, useState } from "react"
import { GridColumn, GridSelection } from "@glideapps/glide-data-grid"

/**
 * datatable hooks for handling universal internal state
 * 
 * @param cols string[]
 * @param rows number
 * @returns 
 */
export const useDataTable = (cols: string[], rows: number) => {
  const [showSearch, setShowSearch] = useState<boolean>(false)

  const [gridSelection, setGridSelection] = useState<GridSelection | undefined>(undefined)

  const [columns, setColumn] = useState<GridColumn[]>(cols.map((name) => ({ title: name, id: name })))

  /**
   * update columns when cols params change
   * 
   */
  useEffect(() => {
    setColumn(cols.map((name) => ({ title: name, id: name })))
  }, [cols])

  /**
   * resize column size function
   * 
   */
  const onColumnResize = useCallback((column: GridColumn, newSize: number) => {
    setColumn(prev => {
      const index = prev.findIndex(col => col.id === column.id);
      const newColumns = [...prev];
      newColumns.splice(index, 1, {
        ...prev[index],
        width: newSize,
      });
      return newColumns;
    });
  }, []);

  /**
   * show or hide search menu on the table
   * 
   * @returns void
   */
  const toggleSearch = () => setShowSearch(!showSearch)

  /**
   * get selection either by columns or rows, and also return the all selected index
   * 
   * @returns 
   */
  const getSelection = (): { type: "column" | "row", data: number[] } | undefined => {
    if (gridSelection === undefined) return

    if (gridSelection.columns.last() !== undefined) {
      return { type: "column", data: gridSelection.columns.toArray() }
    }

    if (gridSelection.rows.last() !== undefined) {
      return { type: "row", data: gridSelection.rows.toArray() }
    }
  }

  return {
    rows,
    columns,
    onColumnResize,
    showSearch,
    toggleSearch,
    gridSelection,
    setGridSelection,
    getSelection
  }
}
