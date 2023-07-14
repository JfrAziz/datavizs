import type { FC } from "react"
import type { BarSvgProps } from "@nivo/bar"
import type { FlatObject } from "@/app/datavizs/types"
import { TextInput } from "@mantine/core"

interface ConfigProps {
  config: BarSvgProps<FlatObject>

  setConfig: (config: BarSvgProps<FlatObject>) => void
}

export const BarConfig: FC<ConfigProps> = ({ config, setConfig }) => {
  return (
    <div>
      <TextInput
        value={config.width}
        type="number"
        onChange={(e) =>
          setConfig({ ...config, width: Number(e.target.value) })
        }
        label="Width"
        description="Input description"
      />
       <TextInput
        value={config.height}
        type="number"
        onChange={(e) =>
          setConfig({ ...config, height: Number(e.target.value) })
        }
        label="Height"
        description="Input description"
      />
    </div>
  )
}
