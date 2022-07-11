import { Button } from '@mantine/core';
import { useModals } from '@mantine/modals';

export function ImportGeoJSONBtn() {
  const modals = useModals();

  const openContextModal = () =>
    modals.openContextModal('importGeoJSONModal', { title: 'Import GeoJSON Data', innerProps: {}, size: 'xl', centered: true });

  return <Button onClick={openContextModal}>Import Data</Button>;
}