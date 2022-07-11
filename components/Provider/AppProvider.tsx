import { BaseMapProvider } from '../Context/BaseMapContext';
import { GeoJSONProvider } from '../Context/GeoJSONContext';
import { MapSettingsProvider } from '../Context/MapSettingsContext';
import { ModalsProvider } from './ModalsProvider';
import { ThemeProvider } from './ThemeProvider';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <GeoJSONProvider>
      <MapSettingsProvider>
        <BaseMapProvider>
          <ModalsProvider>
            {children}
          </ModalsProvider>
        </BaseMapProvider>
      </MapSettingsProvider>
    </GeoJSONProvider>
  </ThemeProvider>
)

export default AppProvider
