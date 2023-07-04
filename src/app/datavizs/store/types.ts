type ColumnType = "string" | "number" | "id"

interface Column {
  name: string
  type: ColumnType
}

interface FlatObject {
  _id: string
  [key: string]: any
}

interface MetaData {
  name: string
  createdAt: Date
  columns: Column[]
}

interface DataState {
  metadata: {
    [id: string]: MetaData
  }
  dataStore: {
    [id: string]: FlatObject[]
  }
}

interface DataAction {
  deleteData: (dataId: string[]) => void

  addData: (metadata: MetaData, data: FlatObject[]) => void

  addColumn: (dataId: string, column: Column) => void

  deleteColumns: (dataId: string, names: string[]) => void

  sortColumn: (dataId: string, name: string, type: "asc" | "desc") => void

  addRow: (dataId: string) => void

  deleteRow: (dataId: string, _ids: string[]) => void

  updateRow: (dataId: string, _id: string, data: FlatObject) => void
}
