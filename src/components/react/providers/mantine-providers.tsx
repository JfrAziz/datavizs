import "@mantine/core/styles.css";
import type { FC, PropsWithChildren } from "react";
import {
  createTheme,
  ColorSchemeScript,
  MantineProvider as Provider,
} from "@mantine/core";

export const MantineProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ColorSchemeScript />
      <Provider
        defaultColorScheme="dark"
        classNamesPrefix="datavizs"
        theme={createTheme({
          primaryColor: "teal",
        })}
      >
        {children}
      </Provider>
    </>
  );
};
