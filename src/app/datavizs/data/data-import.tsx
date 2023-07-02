import clsx from "clsx"
import { useCallback, type FC } from "react"
import { useDropzone } from "react-dropzone"
import { useDisclosure } from "@mantine/hooks"
import { CSVProcessor } from "@/utils/file-processor"
import { IconAppsFilled, IconUpload } from "@tabler/icons-react"
import { useDataStore } from "@/app/datavizs/store/data-store"
import {
  Tabs,
  Text,
  Modal,
  Button,
  ActionIcon,
  ButtonProps,
} from "@mantine/core"

interface DataImport {
  callback?: () => void
}

const DataImportFile: FC<DataImport> = ({ callback }) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    switch (acceptedFiles[0].type) {
      case "text/csv":
        const result = await CSVProcessor(acceptedFiles[0])
        useDataStore.getState().addData(
          {
            name: acceptedFiles[0].name,
            createdAt: new Date(),
            columns: result.columns.map((item) => ({
              name: item,
              type: "string",
            })),
          },
          result.data
        )
        break
    }
    callback && callback()
  }, [])

  const { isDragAccept, isDragReject, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      onDrop: onDrop,
      accept: {
        "text/csv": [".csv", ".tsv"],
      },
    })

  return (
    <div className="flex flex-col h-full space-y-2" {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        className={clsx(
          "flex-1 flex flex-col items-center justify-center space-y-8 border-2 border-dashed border-neutral-border rounded-sm bg-neutral-hover transition-all duration-200",
          isDragAccept && "border-primary",
          isDragReject && "border-red-500"
        )}
      >
        <ActionIcon className="!rounded-full" size={64} variant="light">
          <IconUpload size={32} strokeWidth={1.5} />
        </ActionIcon>
        <Text className="text-center">
          Drag 'n' drop your <strong>CSV</strong> file here, or click to select
          files
        </Text>
      </div>
    </div>
  )
}

export const DataImport: FC<DataImport> = ({ callback }) => {
  return (
    <Tabs
      defaultValue="file"
      variant="default"
      className="w-full !flex !flex-col"
    >
      <Tabs.List>
        <Tabs.Tab value="file">Upload File</Tabs.Tab>
        <Tabs.Tab value="url">Load from URL</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="file" classNames={{ panel: "!flex-1 flex-row" }}>
        <DataImportFile callback={callback} />
      </Tabs.Panel>

      <Tabs.Panel value="url" classNames={{ panel: "!flex-1 flex-row" }}>
        <div className="flex flex-col items-center justify-center h-full">
          <Text>This features not available yet</Text>
        </div>
      </Tabs.Panel>
    </Tabs>
  )
}

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
        <div className="h-72 flex">
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
