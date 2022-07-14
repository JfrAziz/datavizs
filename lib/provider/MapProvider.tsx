import { BaseMapProvider } from '@context/BaseMapContext';
import { MapSettingsProvider } from '@context/MapSettingsContext';

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MapSettingsProvider>
    <BaseMapProvider>
      {children}
    </BaseMapProvider>
  </MapSettingsProvider>
)