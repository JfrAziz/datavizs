import "@glideapps/glide-data-grid/dist/index.css";
import { useCallback, useEffect, useState } from "react"
import { MantineTheme, useMantineTheme } from "@mantine/core"
import DataEditor, { DataEditorProps, GridColumn, GridSelection } from "@glideapps/glide-data-grid"



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
      <DataEditor
        width="100%"
        onPaste={true}
        rowSelect="multi"
        rowMarkers="both"
        smoothScrollY={true}
        smoothScrollX={true}
        theme={getTheme(theme)}
        rowSelectionMode="multi"
        getCellsForSelection={true}
        keybindings={{ search: true }} {...props} />
      <div id="portal" style={{ position: "fixed", left: 0, right: 0, top: 0, zIndex: 9999 }} />
    </>
  )
}