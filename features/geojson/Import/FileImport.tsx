import { useStore } from '@geojson/store';
import { Dropzone } from '@mantine/dropzone';
import { CloudUpload } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import { Text, Group, useMantineTheme } from '@mantine/core';


const DropzoneChildren = ({ type }: { type: "rejected" | "accepted" | "idle" }) => {
  const theme = useMantineTheme();

  const getActiveColor = (type: "rejected" | "accepted" | "idle"): { color: string, text: string } => {
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
          text: "Upload GeoJSON file"
        }
    }
  }

  const activeState = getActiveColor(type)

  return (
    <div style={{ pointerEvents: 'none', paddingBottom: 20 }}>
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

  const showErrorNotifications = () => showNotification({
    title: "Import Error!",
    message: "Please import valid GeoJSON with Feature Collection",
    color: "red"
  })

  const processFile = async (files: File[]) => {
    try {
      importGeoJSON(await files[0].text())
      callback()
    } catch (error) {
      showErrorNotifications()
    }
  }

  return (
    <Dropzone
      radius="md"
      onDrop={processFile}
      onReject={showErrorNotifications}
      accept={["application/json", "application/geo+json"]}>
      <Dropzone.Idle>
        <DropzoneChildren type='idle' />
      </Dropzone.Idle>
      <Dropzone.Accept>
        <DropzoneChildren type='accepted' />
      </Dropzone.Accept>
      <Dropzone.Reject>
        <DropzoneChildren type='rejected' />
      </Dropzone.Reject>
    </Dropzone>
  );
}