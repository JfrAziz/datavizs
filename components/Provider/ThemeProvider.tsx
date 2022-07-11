import React, { useState } from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider, useMantineTheme, } from '@mantine/core'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, primaryColor: 'teal' }} withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default ThemeProvider
