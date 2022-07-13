import { BaseMapProvider } from '../Context/BaseMapContext';
import { MapSettingsProvider } from '../Context/MapSettingsContext';

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MapSettingsProvider>
    <BaseMapProvider>
      {children}
    </BaseMapProvider>
  </MapSettingsProvider>
)