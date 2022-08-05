import { Button, Group, ScrollArea, SimpleGrid } from "@mantine/core"
import { Folder } from "tabler-icons-react"

interface GeoJSONIndex {
  name: string

  type: "folder" | "geojson"

  thumbnail?: string

  endpoint: string
}

const data: GeoJSONIndex[] = [
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "asia",
    type: "folder",
    endpoint: "/asia"
  },
  {
    name: "world.geojson",
    type: "geojson",
    thumbnail: "/world.png",
    endpoint: "/world.geojson"
  },
  {
    name: "world.geojson",
    type: "geojson",
    thumbnail: "/world.png",
    endpoint: "/world.geojson"
  },
  {
    name: "world.geojson",
    type: "geojson",
    thumbnail: "/world.png",
    endpoint: "/world.geojson"
  },
  {
    name: "world.geojson",
    type: "geojson",
    thumbnail: "/world.png",
    endpoint: "/world.geojson"
  }, {
    name: "world.geojson",
    type: "geojson",
    thumbnail: "/world.png",
    endpoint: "/world.geojson"
  },
  {
    name: "world.geojson",
    type: "geojson",
    thumbnail: "/world.png",
    endpoint: "/world.geojson"
  }
]

export const ServerImport = () => {
  return (
    <ScrollArea style={{ height: 200 }}>
      <SimpleGrid cols={3} spacing="sm">
        {data.map((item, id) => {
          return (
            <Group key={id} grow>
              <Button radius={0} variant="light" unstyled>
                <Folder /> {item.name}
              </Button>
            </Group>
          )
        })}
      </SimpleGrid>
    </ScrollArea>
  )
}