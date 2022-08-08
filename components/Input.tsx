import { useEffect, useState } from "react"
import { Refresh } from "tabler-icons-react"
import { getPrecision } from "@lib/misc/stats"
import { randomColor } from "@lib/misc/colors"
import { ActionIcon, ColorInput, NumberInput, NumberInputProps, TextInput, TextInputProps } from "@mantine/core"

/**
 * This component has state to update a precision of input number dynamically.
 */
export const InputNumber = ({ value, onChange, ...others }: NumberInputProps) => {
  const [precision, setPrecision] = useState<number>(value ? getPrecision(value) : 0)

  const updateMinValue = (value: number) => {

    if (value !== undefined) setPrecision(getPrecision(value))

    if (onChange) return onChange(value)
  }

  return <NumberInput sx={{ flex: 1 }} size="xs" value={value} precision={precision} onChange={updateMinValue} {...others} />
}

/**
 * Input color with outside control, so when value changed from outside
 * the value inside state will be updated. This include random color generator
 * 
 */
 interface InputColorProps {
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
    label="Color"
    value={value}
    sx={{ flex: 1 }}
    onChange={updateColor}
    rightSection={<RandomButton {...others} />}
  />
}

/**
 * Input text (string or number) with debounce function to update the value.
 */
 interface InputTextProps extends Omit<TextInputProps, "onChange"> {
  value: string | number;

  label?: string;

  placeholder?: string

  onChange: (value: string) => void
}

export const InputText = ({ value, onChange, ...others }: InputTextProps) => {
  const [val, setVal] = useState(value)

  const updateColor = (value: string) => {
    setVal(value)

    onChange(value)
  }

  return <TextInput sx={{ flex: 1 }} {...others} size="xs" value={val} onChange={e => updateColor(e.target.value)} />
}