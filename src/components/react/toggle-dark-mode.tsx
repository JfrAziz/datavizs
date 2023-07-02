import { IconMoon, IconSun } from "@tabler/icons-react"
import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core"

export const ToggleDarkModeButton = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme()
  const isDark = colorScheme === "dark"
  return (
    <Tooltip label="Toggle Dark Mode">
      <ActionIcon
        variant="default"
        onClick={() => setColorScheme(isDark ? "light" : "dark")}
      >
        {isDark ? (
          <IconSun className="w-4 h-4" />
        ) : (
          <IconMoon className="w-4 h-4" />
        )}
      </ActionIcon>
    </Tooltip>
  )
}
