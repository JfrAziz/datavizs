export type ColumnType = "string" | "number" | "id"

export interface Column {
  name: string
  type: ColumnType
}
