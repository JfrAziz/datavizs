import { useMemo } from "react";
import "@glideapps/glide-data-grid/dist/index.css";
import type { Theme } from "@glideapps/glide-data-grid";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";

export const useDataTableTheme = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const dataTableTheme = useMemo<Partial<Theme>>(() => {
    return colorScheme === "dark"
      ? {
          bgCell: theme.colors.dark[6],
          bgHeader: theme.colors.dark[5],
          bgHeaderHasFocus: theme.colors.dark[6],
          bgHeaderHovered: theme.colors.dark[6],
          textDark: theme.colors.gray[2],
          textHeader: theme.colors.gray[2],
          accentColor: theme.colors[theme.primaryColor][8],
          accentFg: theme.colors[theme.primaryColor][8],
          accentLight: theme.colors.dark[5],
          bgSearchResult: theme.colors.gray[8],
        }
      : {
          bgCell: theme.colors.gray[1],
          bgHeader: theme.colors.gray[0],
          bgHeaderHasFocus: theme.colors.gray[3],
          bgHeaderHovered: theme.colors.gray[3],
          textDark: theme.colors.dark[6],
          textHeader: theme.colors.dark[6],
          accentColor: theme.colors[theme.primaryColor][6],
          accentFg: theme.colors[theme.primaryColor][6],
          accentLight: theme.colors.gray[3],
          bgSearchResult: theme.colors[theme.primaryColor][1],
        };
  }, [colorScheme, theme]);

  return { theme: dataTableTheme };
};
