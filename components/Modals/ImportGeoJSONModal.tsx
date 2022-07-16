import { useModals } from '@mantine/modals';
import { Button, Text } from '@mantine/core';
import { useGeoJSONStore } from '@store/geoJSONStore';
import { ModalsContextProps } from '@mantine/modals/lib/context';
import { GeoJSONFileImport } from '@components/Import/GeoJSONFileImport';

const ImportModalBody: React.FC<{ modals : ModalsContextProps }> = ({ modals }) => <GeoJSONFileImport callback={() => modals.closeAll()} />

export function ImportGeoJSONBtn() {
  const modals = useModals();
  const mapKey = useGeoJSONStore.getState().mapKey

  const openContextModal = () => {
    const openImportGeoJSONModal = () => modals.openModal({
      title: 'Import GeoJSON',
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
      children: <Text size="sm">This will reset current GeoJSON</Text>,
      onConfirm: openImportGeoJSONModal,
    });
  }

  return <Button onClick={openContextModal}>Import Data</Button>;
}