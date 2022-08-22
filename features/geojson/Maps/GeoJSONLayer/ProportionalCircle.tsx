import { Circle } from "react-leaflet"
import { handleNaN } from "@lib/utils/NaN"
import { FeatureExtended, ProportionalCircle as SettingsType } from "@geojson/store/types"

interface ProportionalCircleProps {
  settings: SettingsType

  feature: FeatureExtended
}

export const ProportionalCircle = ({ settings, feature }: ProportionalCircleProps) => {
  const { max, min, borderColor, color } = settings

  const radius = handleNaN(min, 0) + feature.point.radius * (handleNaN(max, 0) - handleNaN(min, 0))

  return <Circle
    radius={radius}
    key={feature.uuid}
    center={feature.point}
    pathOptions={{
      weight: 2,
      color: borderColor,
      fillColor: color,
      fillOpacity: 1
    }} />
}