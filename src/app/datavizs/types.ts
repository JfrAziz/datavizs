export type ColumnType = "string" | "number" | "id"

export interface Column {
  name: string
  type: ColumnType
}

export interface MetaData {
  name: string
  createdAt: Date
  columns: Column[]
}

export interface FlatObject {
  _id: string
  [key: string]: any
}
