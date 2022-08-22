import { useState } from "react"
import { getPrecision } from "@lib/misc/stats"
import { NumberInput, NumberInputProps, } from "@mantine/core"

/**
 * This component has state to update a precision of input number dynamically.
 */
export const InputNumber = ({ value, onChange, ...others }: NumberInputProps) => {
  const [precision, setPrecision] = useState<number>(value ? getPrecision(value) : 0)

  const updateMinValue = (value: number) => {

    if (value !== undefined) setPrecision(getPrecision(value))

    if (onChange) return onChange(value)
  }

  return <NumberInput
    size="xs"
    sx={{ flex: 1 }}
    value={value}
    precision={precision}
    onChange={updateMinValue} {...others} />
}