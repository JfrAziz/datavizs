export type ColumnType = "text" | "number" | "id"

export interface Column {
  title: string,
  type: ColumnType
}