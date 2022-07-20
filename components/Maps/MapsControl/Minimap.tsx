import { useCallback, useMemo, useState } from "react"
import { ControlPosition, LeafletMouseEvent, Map } from "leaflet"
import { CONTROL_CLASSES, POSITION_CLASSES } from "./Common/cssClass"
import { useEventHandlers, useLeafletContext } from '@react-leaflet/core'
import { MapContainer, Rectangle, TileLayer, useMap, useMapEvent } from "react-leaflet"


const MinimapBounds = ({ parentMap, zoom }: { parentMap: Map, zoom: number }) => {
  const minimap = useMap()
  const context = useLeafletContext()

  const onClick = useCallback((e: LeafletMouseEvent) => parentMap.setView(e.latlng, parentMap.getZoom()), [parentMap])
  useMapEvent('click', onClick)

  const [bounds, setBounds] = useState(parentMap.getBounds())
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds())
    minimap.setView(parentMap.getCenter(), zoom)
  }, [minimap, parentMap, zoom])

  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
  useEventHandlers({ instance: parentMap, context: context }, handlers)

  return <Rectangle bounds={bounds} pathOptions={{ weight: 1 }} />
}

export function MinimapControl({ position, zoom }: { zoom?: number, position: ControlPosition }) {
  const parentMap = useMap()
  const mapZoom = zoom || 0

  const minimap = useMemo(() => (
    <MapContainer
      style={{ height: 200, width: 200 }}
      center={parentMap.getCenter()}
      zoom={mapZoom}
      dragging={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      attributionControl={false}
      zoomControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
    </MapContainer>
  ), [])

  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <div className={positionClass}>
      <div className={CONTROL_CLASSES}>{minimap}</div>
    </div>
  )
}