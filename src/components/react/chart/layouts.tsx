import { Divider } from "@mantine/core"
import type { FC, PropsWithChildren } from "react"

interface ConfigSectionProsp extends PropsWithChildren {
  label?: string
}

export const ConfigSection: FC<ConfigSectionProsp> = ({ label, children }) => {
  return (
    <div className="space-y-2 pb-2">
      <Divider label={label} labelPosition="left" />
      {children}
    </div>
  )
}
