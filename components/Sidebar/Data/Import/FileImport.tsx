import { useStore } from '@stores/maps';
import { CloudUpload } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import { Dropzone } from '@mantine/dropzone';
import { Text, Group, useMantineTheme } from '@mantine/core';


type DropzoneChildrenProps = {
  type: "rejected" | "accepted" | "idle"
}

type activeStatus = {
  color: string

  text: string
}

const DropzoneChildren = ({ type }: DropzoneChildrenProps) => {
  const theme = useMantineTheme();

  const getActiveColor = (type: "rejected" | "accepted" | "idle"): activeStatus => {
    switch (type) {
      case "accepted":
        return {
          color: theme.colors[theme.primaryColor][6],
          text: "Drop a file here"
        }
      case "rejected":
        return {
          color: theme.colors.red[6],
          text: "must be GeoJSON file"
        };
      default:
        return {
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
          text: "Upload geoJSON file"
        }
    }
  }

  const activeState = getActiveColor(type)

  return (
    <div style={{ pointerEvents: 'none' }}>
      <Group position="center">
        <CloudUpload size={50} color={activeState.color} />
      </Group>
      <Text align="center" mt="xl" sx={{ color: activeState.color }}>
        {activeState.text}
      </Text>
      <Text align="center" size="sm" mt="xs" color="dimmed">
        Drag&apos;n&apos;drop your geojson files
      </Text>
    </div>
  );
}

export function FileImport({ callback }: { callback: () => void }) {
  const importGeoJSON = useStore.getState().importGeoJSON

  const showFailedImportNotifications = () => showNotification({
    title: "Error Imported File",
    message: "Please import valid GeoJSON Collection files",
    color: "red"
  })

  const processFile = async (files: File[]) => {
    try {
      importGeoJSON(await files[0].text())
    } catch (error) {
      showFailedImportNotifications()
    } finally {
      callback()
    }
  }

  return (
    <Dropzone
      radius="md"
      onDrop={processFile}
      maxSize={10 * 1024 ** 2}
      onReject={showFailedImportNotifications}
      accept={[
        "application/json",
        "application/geo+json",
      ]}
      style={{
        borderWidth: 1,
        paddingBottom: 50
      }}
    >
      <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <DropzoneChildren type='accepted' />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <DropzoneChildren type='rejected' />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <DropzoneChildren type='idle' />
        </Dropzone.Idle>
      </Group>
    </Dropzone>
  );
}