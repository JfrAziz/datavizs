import { GeoJSONProvider } from '../Context/GeoJSONContext';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <GeoJSONProvider>
    {children}
  </GeoJSONProvider>
)