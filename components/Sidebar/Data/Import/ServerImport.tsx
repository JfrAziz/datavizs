import useSWR from "swr";
import { useState } from "react";
import { useStore } from "@stores/maps";
import { showNotification } from "@mantine/notifications";
import { AlertTriangle, Folder, Map } from "tabler-icons-react"
import {
  Text,
  Group,
  Stack,
  Image,
  Anchor,
  Skeleton,
  ThemeIcon,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Breadcrumbs,
  createStyles,
  UnstyledButton,
} from "@mantine/core"

const useStyles = createStyles((theme) => ({
  button: {
    fontWeight: 500,
    width: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  errorMessage: {
    color: theme.colors.red[6],
    margin: `${theme.spacing.md}px 0`
  },

  scrollarea: {
    height: 300,
    padding: 10,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]}`,
  }
}));

interface GeoJSONResponse {
  name: string

  type: "folder" | "geojson"

  thumbnail?: string

  endpoint: string
}

interface FolderStructure {
  name: string

  endpoint: string
}


/**
 * join endpoint with base URL for GEOJSON data from env variable
 * 
 * @param endpoint 
 * @returns 
 */
const getUrl = (endpoint?: string): string => {
  return (new URL(endpoint ?? "/", process.env.NEXT_PUBLIC_GEOJSON_BASEURL)).toString()
}


const FolderItem = ({ item, onClick }: { item: GeoJSONResponse, onClick: () => void }) => {
  const { classes } = useStyles()
  return (
    <UnstyledButton className={classes.button} onClick={onClick}>
      <Group align="center" >
        <ThemeIcon variant="light" size={40}>
          <Folder size={24} strokeWidth={1} />
        </ThemeIcon>
        <Text style={{ flex: 1 }} size="xs">
          {item.name}
        </Text>
      </Group>
    </UnstyledButton>
  )
}

const MapItem = ({ item, onClick }: { item: GeoJSONResponse, onClick: () => void }) => {
  const { classes } = useStyles()

  return (
    <HoverCard width={256} withArrow withinPortal={true} openDelay={200} closeDelay={400} shadow="md">
      <HoverCard.Target>
        <UnstyledButton className={classes.button} onClick={onClick}  >
          <Group align="center" >
            <ThemeIcon variant="light" size={40}>
              <Map size={24} strokeWidth={1} />
            </ThemeIcon>
            <Text style={{ flex: 1 }} size="xs">
              {item.name}
            </Text>
          </Group>
        </UnstyledButton>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Image alt={item.name} src={getUrl(item.thumbnail)} />
      </HoverCard.Dropdown>
    </HoverCard>
  )
}

export const ServerImport = ({ callback }: { callback: () => void }) => {
  const { classes } = useStyles()

  const importGeoJSON = useStore.getState().importGeoJSON

  const [endpoint, setEndpoint] = useState<string>(getUrl())

  const { data, error } = useSWR<GeoJSONResponse[]>(endpoint, (endpoint: string) => fetch(endpoint).then(res => res.json()))

  const [folders, setFolders] = useState<FolderStructure[]>([{ name: "Home", endpoint: endpoint }])

  /**
   * add folder to breadcrumbs
   * 
   * @param folder FolderStructure
   */
  const addFolder = (folder: FolderStructure) => {
    setFolders(state => [...state, folder])

    setEndpoint(folder.endpoint)
  }

  /**
   * remove folder from breadcrumbs and it's child, 
   * example for this breadcrumb `folder1/folder2/folder3`, 
   * if folder 2 clicked, folder 3 will be removed
   * 
   * @param idx number
   * @returns 
   */
  const removeFolder = (idx: number) => {
    if (idx + 1 === folders.length) return;

    const arr = folders;

    arr.splice(-(idx + 1))

    setFolders(arr)

    return setEndpoint(arr[idx].endpoint)
  }

  /**
   * import geoJSON from URL then close the modal by calling the callback
   * 
   * @param url 
   * @returns 
   */
  const importFromUrl = async (url: string) => {
    try {
      importGeoJSON(await fetch(url).then(res => res.text()))

      return callback()

    } catch (error) {

      return showNotification({
        title: "Error Import GeoJSON Data",
        message: "Failed to load geoJSON data",
        color: "red"
      })
    }
  }

  return (
    <>
      <Breadcrumbs style={{ flexWrap: 'wrap' }} styles={{ separator: { paddingBottom: 10 } }} >
        {folders.map((folder, index) => (
          <Anchor
            size="xs"
            key={index}
            type="button"
            component="button"
            style={{ paddingBottom: 10 }}
            onClick={() => removeFolder(index)}
          >
            {folder.name}
          </Anchor>
        ))}
      </Breadcrumbs>

      <ScrollArea className={classes.scrollarea}>
        {error && (
          <Stack justify="center" align="center" className={classes.errorMessage} spacing={8} >
            <AlertTriangle size={50} />
            <Text size="sm" >Failed to Load Data From Server</Text>
          </Stack>
        )}

        <Skeleton visible={!data} width="100%">
          <SimpleGrid
            cols={3}
            spacing={0}
            breakpoints={[
              { maxWidth: 980, cols: 3, spacing: 'xs' },
              { maxWidth: 755, cols: 2, spacing: 'xs' },
              { maxWidth: 600, cols: 1, spacing: 0 },
            ]}>
            {data && data.map((item, index) => {

              if (item.type === "folder") return (
                <FolderItem
                  key={index}
                  item={item}
                  onClick={() => addFolder({
                    name: item.name,
                    endpoint: getUrl(item.endpoint)
                  })}
                />)

              if (item.type === "geojson") return (
                <MapItem
                  key={index}
                  item={item}
                  onClick={() => importFromUrl(getUrl(item.endpoint))}
                />)
            })}
          </SimpleGrid>
        </Skeleton>
      </ScrollArea>
    </>
  )
}