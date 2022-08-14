import "@glideapps/glide-data-grid/dist/index.css";
import { MantineTheme, useMantineTheme } from "@mantine/core"
import DataEditor, { DataEditorProps } from "@glideapps/glide-data-grid"


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
      <div
        id="portal"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 9999
        }} />
    </>
  )
}