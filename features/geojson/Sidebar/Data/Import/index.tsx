import { useStore } from '@geojson/store';
import { FileImport } from './FileImport';
import { useModals } from '@mantine/modals';
import { Button, Text } from '@mantine/core';
import { ServerImport } from './ServerImport';
import { Divider } from '@components/Divider';
import { Options } from '@components/Options';
import { ModalsContextProps } from '@mantine/modals/lib/context';

interface ImportModalBodyProps {
  modals: ModalsContextProps
}

const ImportModalBody = ({ modals }: ImportModalBodyProps) => {
  return (
    <>
      <ServerImport callback={() => modals.closeAll()} />
      <Divider my={20} label="or Upload your GeoJSON" labelPosition='center' />
      <FileImport callback={() => modals.closeAll()} />
    </>
  )
}

export function ImportGeoJSON() {
  const modals = useModals();
  const geoJSONKey = useStore.getState().geoJSONKey

  const openModal = () => {
    const openImportGeoJSONModal = () => modals.openModal({
      title: 'Import GeoJSON',
      size: 'xl',
      centered: true,
      onClose: () => modals.closeAll(),
      children: <ImportModalBody modals={modals} />,
    });

    if (!geoJSONKey) return openImportGeoJSONModal()

    return modals.openConfirmModal({
      title: 'Import a new GeoJSON Collection',
      closeOnConfirm: false,
      closeOnCancel: true,
      centered: true,
      labels: { confirm: 'Continue', cancel: 'Cancel' },
      children: <Text size="sm">current geoJSON data will be deleted?</Text>,
      onConfirm: openImportGeoJSONModal,
    });
  }

  return (
    <Options title="Import Data" description="Import geojson">
      <Button onClick={openModal}>Import Data</Button>
    </Options>
  );
}