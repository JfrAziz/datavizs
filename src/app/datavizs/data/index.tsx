import { DataList } from "./data-list"
import { DataTable } from "./data-table"
import { useState, type FC, Fragment } from "react"
import { DataImportModalButton } from "./data-import"
import { useDataStore } from "@/app/datavizs/store/data-store"

export const Data: FC = () => {
  const [dataId, setDataId] = useState<string>("")

  const metadata = useDataStore((state) => state.metadata)

  if (Object.keys(metadata).length === 0)
    return (
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <DataImportModalButton />
        </div>
      </div>
    )

  return (
    <Fragment>
      <DataList
        dataId={dataId}
        onItemSelected={(dataId) => setDataId(dataId)}
      />
      <DataTable dataId={dataId} />
    </Fragment>
  )
}
