import { useContext } from 'react';
import { CloudUpload } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { GeoJSONContext } from '../Context/GeoJSONContext';
import { Text, Group, useMantineTheme } from '@mantine/core';

const getActiveColor = (status: DropzoneStatus) => {
  const theme = useMantineTheme();
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
      ? theme.colors.red[6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
}

const dropzoneChildren = (status: DropzoneStatus) => {
  return (
    <div style={{ pointerEvents: 'none' }}>
      <Group position="center">
        <CloudUpload size={50} color={getActiveColor(status)} />
      </Group>
      <Text align="center" mt="xl" sx={{ color: getActiveColor(status) }}>
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

export function FileImport({ callback }: { callback: () => void }) {
  const { setGeoJSON } = useContext(GeoJSONContext)

  const processFile = async (files: File[]) => {
    setGeoJSON(await files[0].text())
    callback()
  }

  return (
    <Dropzone
      radius="md"
      maxSize={10 * 1024 ** 2}
      onDrop={processFile}
      onReject={(files) => console.log("rejected", files)}
      style={{
        borderWidth: 1,
        paddingBottom: 50
      }}
      accept={["application/geo+json"]}
    >
      {(status) => dropzoneChildren(status)}
    </Dropzone>
  );
}