import clsx from "clsx"
import { useDropzone } from "react-dropzone"
import { useDisclosure } from "@mantine/hooks"
import { useCallback, type FC, useState } from "react"
import { DataTable, ErrorBar } from "@/components/react"
import { useDataStore } from "@/app/datavizs/store/data-store"
import { IconAppsFilled, IconUpload } from "@tabler/icons-react"
import { CSVProcessor, RawData, JSONProcessor } from "@/utils/file-processor"
import {
  Tabs,
  Text,
  Modal,
  Button,
  ActionIcon,
  ButtonProps,
  ScrollArea,
  TextInput,
  NativeSelect,
} from "@mantine/core"

interface RawDataExtended extends RawData {
  name: string
}

/**
 *  Data Import from File Upload, either json array or csv
 *
 * @param props
 * @returns
 */
const DataImportFile: FC<{
  callback: (rawData: RawDataExtended) => void
}> = ({ callback }) => {
  const [error, setError] = useState<string | undefined>()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    try {
      let result: RawData | undefined = undefined
      switch (file.type) {
        case "text/csv":
          result = await CSVProcessor(file)
          break
        case "application/json":
          result = await JSONProcessor(file)
          break
        default:
          throw Error("File Not Supported")
      }

      setError(undefined)

      result &&
        callback({
          name: file.name,
          data: result.data,
          columns: result.columns,
        })
    } catch (error) {
      setError((error as unknown as string).toString())
    }
  }, [])

  const { isDragAccept, isDragReject, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      onDrop: onDrop,
      accept: {
        "application/json": [".json"],
        "text/csv": [".csv", ".tsv"],
      },
    })

  return (
    <div className="flex flex-col h-full space-y-2 py-2">
      <ErrorBar error={error} />
      <div className="flex-1 flex flex-col" {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={clsx(
            "flex-1 flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-neutral-border rounded-sm bg-neutral-hover transition-all duration-200",
            isDragAccept && "border-primary",
            isDragReject && "border-red-500"
          )}
        >
          <ActionIcon className="!rounded-full" size={64} variant="light">
            <IconUpload size={32} strokeWidth={1.5} />
          </ActionIcon>
          <Text className="text-center">
            Drag 'n' drop your <strong>CSV</strong> or <strong>Json</strong>{" "}
            file here, or click to select files
          </Text>
        </div>
      </div>
    </div>
  )
}

/**
 * component to view before save the data to datastore
 *
 * @param props
 * @returns
 */
const DataPreviewer: FC<{
  data: RawDataExtended
  callback?: () => void
}> = ({ data, callback }) => {
  const [name, setName] = useState(data.name)

  const [columns, setColumns] = useState<Column[]>(
    data.columns.map((item) => ({
      name: item,
      type: "string",
    }))
  )

  const updateColumn = (idx: number, type: "string" | "number") =>
    setColumns(
      columns.map((item, index) =>
        index !== idx ? item : { ...item, type: type }
      )
    )

  const addData = () => {
    const metadata: MetaData = {
      name: name,
      columns: columns,
      createdAt: new Date(),
    }
    useDataStore.getState().addData(metadata, data.data)

    callback && callback()
  }

  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="flex items-end pr-1 space-x-2">
        <TextInput
          value={name}
          className="flex-1"
          placeholder="Data Name"
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <Button onClick={addData}>Add Data</Button>
      </div>
      <div className="flex-1 flex flex-row overflow-hidden">
        <ScrollArea className="w-48 pr-4">
          {columns.map((item, idx) => (
            <NativeSelect
              key={idx}
              className="mb-2"
              value={columns[idx].type}
              data={["string", "number"]}
              onChange={(e) =>
                updateColumn(idx, e.currentTarget.value as "string" | "number")
              }
              label={
                <Text size="sm" className="break-all line-clamp-1 mb-0">
                  Column: <span className="font-bold">{item.name}</span>
                </Text>
              }
            />
          ))}
        </ScrollArea>
        <DataTable data={data.data} columns={columns} />
      </div>
    </div>
  )
}

/**
 * Main component to handle multi source data
 *
 * @param props
 * @returns
 */
export const DataImport: FC<{
  callback?: () => void
}> = ({ callback }) => {
  const [data, setData] = useState<RawDataExtended | undefined>()

  if (data) return <DataPreviewer callback={callback} data={data} />

  return (
    <Tabs
      variant="default"
      defaultValue="file"
      className="w-full !flex !flex-col"
    >
      <Tabs.List>
        <Tabs.Tab value="file">Upload File</Tabs.Tab>
        <Tabs.Tab value="url">Load from URL</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="file" classNames={{ panel: "!flex-1 flex-row" }}>
        <DataImportFile callback={(data) => setData(data)} />
      </Tabs.Panel>

      <Tabs.Panel value="url" classNames={{ panel: "!flex-1 flex-row" }}>
        <div className="flex flex-col items-center justify-center h-full">
          <Text>Coming soon</Text>
        </div>
      </Tabs.Panel>
    </Tabs>
  )
}

/**
 * just DataImport in modal
 * 
 * @param props
 * @returns 
 */
export const DataImportModalButton: FC<
  Pick<ButtonProps, "variant" | "size">
> = ({ ...props }) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        centered
        size="xl"
        opened={opened}
        onClose={close}
        title="Import Data"
      >
        <div className="h-96 flex">
          <DataImport callback={() => close()} />
        </div>
      </Modal>

      <Button
        {...props}
        onClick={open}
        leftSection={<IconAppsFilled size={16} />}
      >
        <Text size="sm">Import Data</Text>
      </Button>
    </>
  )
}
