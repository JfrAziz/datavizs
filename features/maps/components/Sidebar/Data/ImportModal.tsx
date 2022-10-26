import { useModals } from '@mantine/modals';
import { Divider } from '@components/Divider';
import { useStore } from 'features/maps/store';
import { Settings } from '@components/Settings';
import { Button, Group, Text } from '@mantine/core';
import { FileImport } from 'features/maps/components/Import/FileImport';
import { ServerImport } from 'features/maps/components/Import/ServerImport';

interface ImportModalBodyProps {
  callback: (text: string) => void
}

const ImportModalBody = ({ callback }: ImportModalBodyProps) => {
  return (
    <>
      <ServerImport callback={callback} />

      <Divider my={20} label="or Upload your GeoJSON" labelPosition='center' />

      <FileImport callback={callback} />
    </>
  )
}


export function ImportModal() {
  const modals = useModals();

  const geoJSONKey = useStore.getState().geoJSONKey

  const importData = useStore.getState().importData
  
  const importDataAndReset = useStore.getState().importDataAndReset

  const callback = (text: string, isReseted: boolean) => {
    isReseted ? importDataAndReset(text) : importData(text);

    modals.closeAll()
  }

  /**
   * open import modal
   * 
   * @param isReseted boolean
   */
  const openImportModal = (isReseted: boolean) => modals.openModal({
    size: 'xl',
    centered: true,
    title: 'Import Data',
    closeOnClickOutside: false,
    onClose: () => modals.closeAll(),
    children: <ImportModalBody callback={(text) => callback(text, isReseted)} />,
  });


  /**
   * open  confirmation modal when app has data
   */
  const openModalConfirmation = () => modals.openModal({
    centered: true,
    title: 'Import GeoJSON Collection',
    children: (
      <div>
        <Text size="sm" pb={24}>Import geojson to existing data, or clear all data and import new</Text>
        <Group position="right">
          <Button variant='default' onClick={() => modals.closeAll()}>
            Cancel
          </Button>
          <Button onClick={() => openImportModal(false)} >
            Import
          </Button>
          <Button onClick={() => openImportModal(true)} color="red">
            Clear and Import
          </Button>
        </Group>
      </div>
    ),
  });

  const openModal = () => geoJSONKey ? openModalConfirmation() : openImportModal(true)

  return (
    <Settings title="Import Data" description="Import from existing collection or upload your data">
      <Button onClick={openModal}>Import Data</Button>
    </Settings>
  );
}