import { useState } from 'react';
import { useStore } from '@geojson/store';
import { GeoJSONPopup } from './GeoJSONPopup';
import { PathOptions, LatLng } from "leaflet";
import { Popup, GeoJSON } from "react-leaflet";
import { FeatureExtended, GeoJSONSettings } from '@geojson/store/types';


interface GeoJSONProps {
  feature: FeatureExtended

  settings: GeoJSONSettings
}

export const GeoJSONComponent = ({ feature, settings }: GeoJSONProps) => {
  const [latLng, setLatLng] = useState<LatLng>(new LatLng(feature.point.lat, feature.point.lng))

  const createStyles = (settings: { color: string } & GeoJSONSettings): PathOptions => ({
    opacity: 1,
    dashArray: '0',
    fillColor: settings.color,
    color: settings.borderColor,
    weight: settings.borderWidth,
    fillOpacity: settings.opacity,
  })

  return (
    <GeoJSON
      data={feature}
      onEachFeature={(f, l) => l.on("click", (e) => setLatLng(e.latlng))}
      style={createStyles({ ...settings, color: feature.properties.color, })} >
      <Popup minWidth={100} closeButton={false}>
        <GeoJSONPopup latLng={latLng} feature={feature} />
      </Popup>
    </GeoJSON>
  )
}
