import { useContext } from 'react';
import { useModals } from '@mantine/modals';
import { Button, Text } from '@mantine/core';
import { FileImport } from '../Import/FileImport';
import { GeoJSONContext } from '../Context/GeoJSONContext';
import { ModalsContextProps } from '@mantine/modals/lib/context';


const ImportModalBody: React.FC<{ modals : ModalsContextProps }> = ({ modals }) => <FileImport callback={() => modals.closeAll()} />

export function ImportGeoJSONBtn() {
  const modals = useModals();
  const { mapKey } = useContext(GeoJSONContext)

  const openContextModal = () => {
    const openImportGeoJSONModal = () => modals.openModal({
      title: 'Subscribe to newsletter',
      size: 'xl',
      centered: true,
      onClose: () => modals.closeAll(),
      children: <ImportModalBody modals={modals} />,
    });

    if (!mapKey) return openImportGeoJSONModal()

    return modals.openConfirmModal({
      title: 'Import a new GeoJSON Collection',
      closeOnConfirm: false,
      closeOnCancel: true,
      centered: true,
      labels: { confirm: 'Continue', cancel: 'Cancel' },
      children: <Text size="sm">This will reset current GeoJSON data</Text>,
      onConfirm: openImportGeoJSONModal,
    });
  }

  return <Button onClick={openContextModal}>Import Data</Button>;
}