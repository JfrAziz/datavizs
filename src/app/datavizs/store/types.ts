import type { Column, FlatObject } from "@/app/datavizs/types"

interface MetaData {
  name: string
  createdAt: Date
  columns: Column[]
}

export interface DataState {
  metadata: {
    [id: string]: MetaData
  }
  dataStore: {
    [id: string]: FlatObject[]
  }
}

export interface DataAction {
  deleteData: (dataId: string[]) => void

  addData: (metadata: MetaData, data: FlatObject[]) => void

  addColumn: (dataId: string, column: Column) => void

  deleteColumns: (dataId: string, names: string[]) => void

  sortColumn: (dataId: string, name: string, type: "asc" | "desc") => void

  addRow: (dataId: string) => void

  deleteRow: (dataId: string, _ids: string[]) => void

  updateRow: (dataId: string, _id: string, data: FlatObject) => void
}

interface Vizs {
  name: string
  data: any
  settings: any
}

export interface VizsState {
  layouts: string[]
  visz: {
    [id: string]: Vizs
  }
}

export interface VizsAction {}
