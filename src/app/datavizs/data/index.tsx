import { DataList } from "./data-list"
import { DataTable } from "./data-table"
import { useState, type FC, Fragment } from "react"
import { DataImportModalButton } from "./data-import"
import { ZustandHydration } from "@/components/react"
import { useDataStore } from "@/app/datavizs/store/data-store"
import type { ZustandPersistedStore } from "@/components/react"

export const Data: FC = () => {
  const [dataId, setDataId] = useState<string>("")

  const metadata = useDataStore((state) => state.metadata)

  return (
    <ZustandHydration store={useDataStore as ZustandPersistedStore}>
      {Object.keys(metadata).length === 0 ? (
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <DataImportModalButton />
          </div>
        </div>
      ) : (
        <Fragment>
          <DataList
            dataId={dataId}
            onItemSelected={(dataId) => setDataId(dataId)}
          />
          <DataTable dataId={dataId} />
        </Fragment>
      )}
    </ZustandHydration>
  )
}

export { DataImportModalButton }
