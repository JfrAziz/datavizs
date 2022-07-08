import Header from './Header/Header';
import React, { useState } from 'react';
import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider, useMantineTheme, } from '@mantine/core'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useMantineTheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell
          styles={{
            main: {
              background: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          }}
          fixed
          header={<Header />}
        >
          {children}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default Layout
