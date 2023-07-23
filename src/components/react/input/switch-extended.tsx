import { Input, Switch } from "@mantine/core"
import type { CSSProperties, FC } from "react"

/**
 * handle return output from switchInput to boolean
 *
 * @param e
 * @param currentValue
 * @returns
 */
const switchHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  currentValue?: boolean
): boolean => (!currentValue ? e.currentTarget.value === "on" : false)

interface SwitchExtendedProps {
  checked?: boolean

  defaultChecked?: boolean

  onChange?: (val: boolean) => void

  label?: string

  description?: string

  className?: string

  style?: CSSProperties
}

export const SwitchExtended: FC<SwitchExtendedProps> = ({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  className,
  style,
}) => {
  return (
    <Input.Wrapper
      style={style}
      label={label}
      className={className}
      description={description}
    >
      <Switch
        defaultChecked={defaultChecked}
        checked={checked ?? defaultChecked}
        onChange={(e) => onChange && onChange(switchHandler(e, checked))}
      />
    </Input.Wrapper>
  )
}
