import { useContext } from 'react';
import { CloudUpload } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
import { GeoJSONContext } from '../../Context/GeoJSONContext';
import { Text, Group, createStyles, MantineTheme, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },
}));

const getActiveColor = (status: DropzoneStatus, theme: MantineTheme) => {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
      ? theme.colors.red[6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
}

const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => {
  return (
    <div style={{ pointerEvents: 'none' }}>
      <Group position="center">
        <CloudUpload size={50} color={getActiveColor(status, theme)} />
      </Group>
      <Text align="center" weight={700} size="lg" mt="xl" sx={{ color: getActiveColor(status, theme) }}>
        {
          status.accepted
            ? 'Drop files here'
            : status.rejected
              ? 'JSON files'
              : 'Upload resume'
        }
      </Text>
      <Text align="center" size="sm" mt="xs" color="dimmed">
        Drag&apos;n&apos;drop your geojson files
      </Text>
    </div>
  );
}

export function FileImport({ callback } : { callback: () => void}) {
  const { setGeoJSON } = useContext(GeoJSONContext)
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const processFile = async (files: File[]) => {
    const textFile = await files[0].text()
    setGeoJSON(textFile)
    callback()
  } 

  return (
    <div className={classes.wrapper}>
      <Dropzone className={classes.dropzone} radius="md" maxSize={10 * 1024 ** 2}
        onDrop={processFile}
        onReject={(files) => console.log('rejected files', files)}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
    </div>
  );
}