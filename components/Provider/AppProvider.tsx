import { MapProvider } from './MapProvider';
import { DataProvider } from './DataProvider';
import { MantineProvider } from './MantineProvider';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DataProvider>
    <MantineProvider>
      <MapProvider>
        {children}
      </MapProvider>
    </MantineProvider>
  </DataProvider>
)

export default AppProvider
