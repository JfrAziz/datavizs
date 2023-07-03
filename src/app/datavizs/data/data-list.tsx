import clsx from "clsx"
import { useEffect, type FC } from "react"
import { IconTable, IconTrash } from "@tabler/icons-react"
import { useDataStore as useStore } from "@/app/datavizs/store/data-store"
import {
  Text,
  Avatar,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core"

interface DataList {
  dataId: string
  onItemSelected: (dataId: string) => void
}

export const DataList: FC<DataList> = ({ dataId, onItemSelected }) => {
  const theme = useMantineTheme()

  const metadata = useStore((state) => state.metadata)

  /**
   * auto open data if just one data.
   */
  useEffect(() => {
    if (metadata === undefined) return

    const metadataLength = Object.keys(metadata).length

    if (metadataLength >= 1) {
      onItemSelected(Object.keys(metadata)[metadataLength - 1])
    }
  }, [metadata])

  /**
   * just wrapper for action on each item
   *
   * @param e
   * @param callback
   */
  const itemActionWrapper = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    callback: () => void
  ) => {
    e.stopPropagation()

    callback()
  }

  return (
    <div className="max-w-xs min-w-[20rem] flex flex-col border-r border-neutral-border">
      <ScrollArea className="flex-1 p-1">
        {Object.keys(metadata).map((item) => (
          <div
            key={item}
            onClick={() => onItemSelected(item)}
            className={clsx(
              "w-full hover:bg-neutral-hover rounded-sm cursor-pointer",
              dataId === item && "!bg-neutral-hover"
            )}
          >
            <div className="group flex items-center p-2 space-x-2 border-b border-neutral-border">
              <Avatar color={dataId === item ? theme.primaryColor : "gray"}>
                <IconTable size={20} />
              </Avatar>
              <div className="flex-1 flex flex-col space-y-1.5">
                <Text size="xs" fw={600} className="line-clamp-1 break-all">
                  {metadata[item].name}
                </Text>
                <Text size="xs" className="line-clamp-1 break-all">
                  {metadata[item].createdAt.toLocaleTimeString('en-US')}
                </Text>
              </div>
              <Text className="hidden group-hover:flex space-x-2 items-center">
                <ActionIcon
                  color="red"
                  variant="filled"
                  onClick={(e) =>
                    itemActionWrapper(e, () =>
                      useStore.getState().deleteData([item])
                    )
                  }
                >
                  <IconTrash className="w-4 h-4" />
                </ActionIcon>
              </Text>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
