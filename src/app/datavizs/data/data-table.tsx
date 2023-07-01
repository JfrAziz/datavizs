import type { FC } from "react"
import { DataTable as DataTableComponent } from "@/components/react"
import { COLUMN_ID, useDataStore } from "@/app/datavizs/store/data-store"

export const DataTable: FC<{ dataId: string }> = ({ dataId }) => {
  const data = useDataStore((state) => state.dataStore[dataId])

  const metadata = useDataStore((state) => state.metadata[dataId])

  if (data === undefined || metadata === undefined) return null

  return (
    <DataTableComponent
      search
      data={data}
      _id={COLUMN_ID}
      title={metadata.name}
      createRow={() => useDataStore.getState().addRow(dataId)}
      columns={metadata.columns.filter((item) => item.name !== COLUMN_ID)}
      edit={(_id, data) => useDataStore.getState().updateRow(dataId, _id, data)}
      createColumn={(column) =>
        useDataStore.getState().addColumn(dataId, column)
      }
      sort={(name, type) =>
        useDataStore.getState().sortColumn(dataId, name, type)
      }
      remove={(type, data) => {
        if (type === "row") useDataStore.getState().deleteRow(dataId, data)
        if (type === "column")
          useDataStore.getState().deleteColumns(dataId, data)
      }}
    />
  )
}
