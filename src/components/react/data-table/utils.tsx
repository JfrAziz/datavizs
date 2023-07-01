import type { Column, ColumnType } from "./types"
import {
  GridCell,
  GridColumn,
  GridCellKind,
  GridColumnIcon,
} from "@glideapps/glide-data-grid"

const gridCellIcon: Record<ColumnType, any> = {
  id: GridColumnIcon.HeaderRowID,
  string: GridColumnIcon.HeaderString,
  number: GridColumnIcon.HeaderNumber,
}

export const createColumn = (
  column: Column,
  menu: boolean = false
): GridColumn => ({
  id: column.name,
  title: column.name,
  hasMenu: menu,
  icon: gridCellIcon[column.type],
  width: 120,
})

export const createTextCell = (data: string): GridCell => ({
  kind: GridCellKind.Text,
  allowOverlay: true,
  readonly: false,
  displayData: (data ?? "").toString(),
  data: data,
})

export const createNumberCell = (data: number): GridCell => ({
  kind: GridCellKind.Number,
  allowOverlay: true,
  readonly: false,
  displayData: (data ?? "").toString(),
  data: data,
})

export const createIdCell = (data: string): GridCell => ({
  kind: GridCellKind.RowID,
  allowOverlay: true,
  readonly: true,
  data: data,
})
