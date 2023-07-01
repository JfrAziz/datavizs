import { Sidebar } from "./sidebar"
import { DataTable } from "./data-table"
import { Button, Text } from "@mantine/core"
import { useState, type FC, Fragment } from "react"
import { IconAppsFilled } from "@tabler/icons-react"
import { useDataStore } from "@/app/datavizs/store/data-store"

export const Data: FC = () => {
  const [dataId, setDataId] = useState<string>("")

  const metadata = useDataStore((state) => state.metadata)

  if (Object.keys(metadata).length === 0)
    return (
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Button variant="outline" leftSection={<IconAppsFilled size={20} />}>
            <Text>Import Data</Text>
          </Button>
        </div>
      </div>
    )

  return (
    <Fragment>
      <Sidebar dataId={dataId} onItemSelected={(dataId) => setDataId(dataId)} />
      <DataTable dataId={dataId} />
    </Fragment>
  )
}
