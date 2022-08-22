import { useState } from "react"
import { TextInput, TextInputProps, } from "@mantine/core"

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

  return <TextInput
    size="xs"
    value={val}
    sx={{ flex: 1 }}
    onChange={e => updateColor(e.target.value)} {...others} />
}