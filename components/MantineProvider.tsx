import React, { useState } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { ColorScheme, ColorSchemeProvider, MantineProvider as MantineRootProvider } from '@mantine/core'

export const MantineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineRootProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          primaryColor: 'teal',
          loader: 'bars',
          components: {
            Switch: {
              styles: {
                input: {
                  cursor: "pointer"
                }
              }
            }
          }
        }} >
        <NotificationsProvider>
          <ModalsProvider>
            {children}
          </ModalsProvider>
        </NotificationsProvider>
      </MantineRootProvider>
    </ColorSchemeProvider>
  )
}
