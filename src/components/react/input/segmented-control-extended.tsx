import type { CSSProperties, FC } from "react"
import { Input, SegmentedControl, SegmentedControlProps } from "@mantine/core"

interface SegmentedControlExtendedProps<T extends string>
  extends SegmentedControlProps {
  defaultValue?: T

  onChange?: (value: T) => void

  label?: string

  description?: string

  className?: string

  style?: CSSProperties
}

export const SegmentedControlExtended = <T extends string>({
  onChange,
  defaultValue,
  label,
  description,
  style,
  className,
  ...props
}: SegmentedControlExtendedProps<T>) => {
  return (
    <Input.Wrapper
      style={style}
      className={className}
      label={label}
      description={description}
    >
      <SegmentedControl
        defaultValue={defaultValue}
        onChange={onChange}
        {...props}
      />
    </Input.Wrapper>
  )
}
