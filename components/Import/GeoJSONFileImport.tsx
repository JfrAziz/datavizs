import { CloudUpload } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import { useGeoJSONStore } from 'lib/store/geoJSONStore';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { Text, Group, useMantineTheme } from '@mantine/core';


const DropzoneChildren = (status: DropzoneStatus) => {
  const theme = useMantineTheme();
  const getActiveColor = () => {
    return status.accepted
      ? theme.colors[theme.primaryColor][6]
      : status.rejected
        ? theme.colors.red[6]
        : theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.colors.gray[7];
  }
  return (
    <div style={{ pointerEvents: 'none' }}>
      <Group position="center">
        <CloudUpload size={50} color={getActiveColor()} />
      </Group>
      <Text align="center" mt="xl" sx={{ color: getActiveColor() }}>
        {
          status.accepted
            ? 'Drop a file here'
            : status.rejected
              ? 'must be JSON file'
              : 'Upload geoJSON file'
        }
      </Text>
      <Text align="center" size="sm" mt="xs" color="dimmed">
        Drag&apos;n&apos;drop your geojson files
      </Text>
    </div>
  );
}

export function GeoJSONFileImport({ callback }: { callback: () => void }) {
  const importGeoJSON = useGeoJSONStore((state) => state.importGeoJSON)

  const showFailedImportNotifications = () => showNotification({
    title: "Error Imported File",
    message: "Please import valid GeoJSON Collection files",
    color: "red"
  })

  const processFile = async (files: File[]) => {
    try {
      // setGeoJSON(await files[0].text())
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
      maxSize={10 * 1024 ** 2}
      onDrop={processFile}
      onReject={showFailedImportNotifications}
      accept={["application/geo+json"]}
      style={{
        borderWidth: 1,
        paddingBottom: 50
      }}
    >
      {(status) => DropzoneChildren(status)}
    </Dropzone>
  );
}