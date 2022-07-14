import { MapProvider } from './MapProvider';
import { MantineProvider } from './MantineProvider';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MantineProvider>
    <MapProvider>
      {children}
    </MapProvider>
  </MantineProvider>
)

export default AppProvider
