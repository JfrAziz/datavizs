import { useEffect, useState } from "react"
import { Refresh } from "tabler-icons-react"
import { randomColor } from "@lib/misc/colors"
import { ActionIcon, ColorInput, ColorInputProps, } from "@mantine/core"


/**
 * Input color with outside control, so when value changed from outside
 * the value inside state will be updated. This include random color generator
 * 
 */
interface InputColorProps extends ColorInputProps {
  color: string;

  onChange: (value: string) => void
}

export const InputColor = ({ color, onChange, ...others }: InputColorProps) => {
  const [value, setColor] = useState<string>(color)

  const updateColor = (value: string) => {
    setColor(value)
    onChange(value)
  }

  useEffect(() => { setColor(color) }, [color])

  const RandomButton = () => (
    <ActionIcon onClick={() => updateColor(randomColor())}>
      <Refresh size={16} />
    </ActionIcon>
  )

  return <ColorInput
    size="xs"
    format="hex"
    value={value}
    sx={{ flex: 1 }}
    onChange={updateColor}
    rightSection={<RandomButton />}
    {...others}
  />
}