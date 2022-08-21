import { useState } from "react";
import { minMaxValue } from "@geojson/store/types";
import { InputNumber } from "@components/Input";

interface InputMinMaxProps {
  value: minMaxValue

  onChange: (value: minMaxValue) => void
}

export const InputMinMax = ({ value, onChange }: InputMinMaxProps) => {
  const [rangeValue, setRangeValue] = useState<minMaxValue>(value)

  const updateValue = (value: minMaxValue) => {
    setRangeValue(value)

    onChange(value)
  }

  return (
    <>
      <InputNumber
        placeholder="min"
        value={rangeValue.min}
        onChange={(min) => updateValue({ max: rangeValue.max, min: min })} />
      <InputNumber
        placeholder="max"
        min={rangeValue.min}
        value={rangeValue.max}
        onChange={max => updateValue({ min: rangeValue.min, max: max })} />
    </>
  )
}