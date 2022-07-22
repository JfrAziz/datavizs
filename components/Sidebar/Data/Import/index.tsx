import { useStore } from '@stores/maps';
import { FileImport } from './FileImport';
import { useModals } from '@mantine/modals';
import { Button, Text } from '@mantine/core';
import { ListItem } from "@components/Sidebar/Common/ListItem";
import { ModalsContextProps } from '@mantine/modals/lib/context';


const ImportModalBody: React.FC<{ modals: ModalsContextProps }> = ({ modals }) => <FileImport callback={() => modals.closeAll()} />

export function ImportGeoJSON() {
  const modals = useModals();
  const mapKey = useStore.getState().mapKey

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

  return (
    <ListItem title="Import Data" description="Import geojson">
      <Button onClick={openContextModal}>Import Data</Button>
    </ListItem>
  );
}