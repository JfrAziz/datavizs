import "@glideapps/glide-data-grid/dist/index.css";
import { useCallback, useEffect, useState } from "react"
import { MantineTheme, useMantineTheme } from "@mantine/core"
import DataEditor, { DataEditorProps, GridColumn, GridSelection } from "@glideapps/glide-data-grid"

type DataTableSelection = { type: "column", data: number } | { type: "row", data: number[] }

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
    const newCols: GridColumn[] = cols.map((name) => ({ title: name, id: name }))
    setColumn(newCols)
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
   * custom function to get selected rows index from grid selection
   * 
   * @param gridSelection 
   * @returns 
   */
  const getSelectedRowIndex = (gridSelection: GridSelection): number[] => {
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

  /**
   * custom function to get selected column index from grid selection
   * 
   * @param gridSelection 
   * @returns 
   */
  const getSelectedColumnIndex = (gridSelection: GridSelection): number | undefined => {
    if (gridSelection === undefined) return

    const columnIdx = gridSelection.columns.last()

    if (columnIdx === undefined) return;

    return gridSelection?.columns?.last()
  }

  /**
   * get selection either by column or row, and also return the all selected index
   * 
   * @returns 
   */
  const getSelection = (): DataTableSelection | undefined => {
    if (gridSelection === undefined) return

    if (gridSelection.columns.last() !== undefined) {
      const selectedIndex = getSelectedColumnIndex(gridSelection)

      if (selectedIndex === undefined) return;

      return { type: "column", data: selectedIndex }
    }

    if (gridSelection.rows.last() !== undefined) {
      const selectedIdx = getSelectedRowIndex(gridSelection)
      return { type: "row", data: selectedIdx }
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

/**
 * Custom Datatable from DataGrid with mantine theme
 * 
 * @param props 
 * @returns 
 */
export const DataTable = (props: DataEditorProps) => {
  const theme = useMantineTheme()

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

  return (
    <>
      <DataEditor width="100%" onPaste={true} theme={getTheme(theme)} getCellsForSelection={true} keybindings={{ search: true }} {...props} />
      <div id="portal" style={{ position: "fixed", left: 0, right: 0, top: 0, zIndex: 9999 }} />
    </>
  )
}