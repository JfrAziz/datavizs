import ReactDOM from "react-dom"
import { DomEvent } from 'leaflet'
import { PropsWithChildren, useEffect, useState } from 'react'
import { CONTROL_CLASSES, POSITION_CLASSES } from './cssClass'

export const CustomControlWrapper = (props: PropsWithChildren): JSX.Element => {
  const [container, setContainer] = useState<any>(document.createElement('div'))
  const positionClass = POSITION_CLASSES.topleft

  useEffect(() => {
    const targetDiv = document.getElementsByClassName(positionClass)
    setContainer(targetDiv[0])
  }, [])

  const controlContainer = <div className={CONTROL_CLASSES}>{props.children}</div>

  DomEvent.disableClickPropagation(container)

  return ReactDOM.createPortal(controlContainer, container)
}

