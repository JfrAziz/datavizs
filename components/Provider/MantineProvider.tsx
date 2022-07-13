import React, { useState } from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider as MantineRootProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals';

export const MantineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineRootProvider theme={{ colorScheme, primaryColor: 'teal' }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          {children}
        </ModalsProvider>
      </MantineRootProvider>
    </ColorSchemeProvider>
  )
}
