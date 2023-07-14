import { FC, useEffect, useState } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { ColorInput } from "@/components/react/mantine/color-input"

export const ColorTextInput: FC<{
  value: string

  onChange: (val: string) => void

  label?: string

  description?: string
}> = ({ value, onChange, label, description }) => {
  const [color, setColor] = useState(value)

  const [debounced] = useDebouncedValue(color, 200)

  useEffect(() => {
    onChange(color)
  }, [debounced])

  return (
    <ColorInput
      value={color}
      label={label}
      format="hexa"
      description={description}
      onChange={(val) => setColor(val)}
    />
  )
}
