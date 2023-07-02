import "@mantine/core/styles.css"
import type { FC, PropsWithChildren } from "react"
import {
  createTheme,
  ColorSchemeScript,
  CSSVariablesResolver,
  MantineProvider as Provider,
} from "@mantine/core"

/**
 * default theme for mantine providers
 */
const theme = createTheme({ primaryColor: "teal" })

/**
 * additional css variables to used in tailwind
 * 
 * @param theme 
 * @returns 
 */
const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-neutral": theme.white,
    "--mantine-color-neutral-color": theme.black,
    "--mantine-color-neutral-hover": theme.colors.gray[0],
    "--mantine-color-neutral-border": theme.colors.gray[2],
  },
  dark: {
    "--mantine-color-neutral": theme.colors.dark[7],
    "--mantine-color-neutral-color": theme.colors.dark[0],
    "--mantine-color-neutral-hover": theme.colors.dark[6],
    "--mantine-color-neutral-border": theme.colors.dark[5],
  },
})

export const MantineProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ColorSchemeScript />
      <Provider
        theme={theme}
        defaultColorScheme="dark"
        classNamesPrefix="datavizs"
        cssVariablesResolver={resolver}
      >
        {children}
      </Provider>
    </>
  )
}
