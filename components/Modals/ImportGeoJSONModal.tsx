import { ContextModalProps } from '@mantine/modals';
import { FileImport } from './Import/FileImport';

export const ImportGeoJSONModal = ({ context, id }: ContextModalProps) => (
  <>
    <FileImport callback={() => context.closeModal(id)} />
  </>
);