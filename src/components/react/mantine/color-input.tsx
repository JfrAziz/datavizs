import React, { useState, forwardRef } from "react"
import {
  Input,
  Popover,
  ColorSwatch,
  ColorPicker,
  InputProps,
  ColorPickerProps,
} from "@mantine/core"

export interface ColorInputProps extends ColorPickerProps {
  value: string

  label?: string

  description?: string

  onChange: (value: string) => void
}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  (props, ref) => {
    const [dropdownOpened, setDropdownOpened] = useState(false)

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setDropdownOpened(true)
    }

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setDropdownOpened(false)
    }

    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
      setDropdownOpened(true)
    }

    return (
      <Input.Wrapper label={props.label} description={props.description}>
        <Popover position="bottom-start" offset={5} opened={dropdownOpened}>
          <Popover.Target>
            <div>
              <Input<"input">
                ref={ref}
                size="xs"
                spellCheck={false}
                autoComplete="off"
                value={props.value}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onClick={handleInputClick}
                leftSection={
                  <ColorSwatch size={20} color={props.value ?? "#fff"} />
                }
                onChange={(event) => props.onChange(event.currentTarget.value)}
              />
            </div>
          </Popover.Target>

          <Popover.Dropdown onMouseDown={(event) => event.preventDefault()}>
            <ColorPicker
              {...props}
              value={props.value}
              onChange={props.onChange}
              onColorSwatchClick={() => setDropdownOpened(false)}
            />
          </Popover.Dropdown>
        </Popover>
      </Input.Wrapper>
    )
  }
)
