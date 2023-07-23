import { useMemo, type FC, CSSProperties } from "react"
import { Input, Slider, SliderProps, TextInput } from "@mantine/core"

interface SliderExtendedProps extends SliderProps {
  label?: string

  description?: string

  className?: string

  style?: CSSProperties
}

export const SliderExtended: FC<SliderExtendedProps> = ({
  max,
  min,
  step,
  value,
  label,
  onChange,
  className,
  description,
  defaultValue = 0,
  style,
}) => {
  const precision = useMemo(
    () => String(step).split(".").pop()?.length ?? 0,
    []
  )
  return (
    <Input.Wrapper
      label={label}
      style={style}
      className={className}
      description={description}
    >
      <div className="flex items-center space-x-2">
        <TextInput
          disabled
          size="xs"
          className="w-16"
          value={Number(value ?? defaultValue).toFixed(precision)}
        />
        <Slider
          className="flex-1"
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          defaultValue={defaultValue}
          value={value ?? defaultValue}
          label={Number(value ?? defaultValue).toFixed(precision)}
        />
      </div>
    </Input.Wrapper>
  )
}
