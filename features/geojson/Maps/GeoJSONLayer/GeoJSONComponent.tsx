import { useState } from 'react';
import { useStore } from '@geojson/store';
import { GeoJSONPopup } from './GeoJSONPopup';
import { PathOptions, LatLng } from "leaflet";
import { Popup, GeoJSON } from "react-leaflet";
import { FeatureExtended, GeoJSONSettings } from '@geojson/store/types';


interface GeoJSONProps {
  feature: FeatureExtended
}

export const GeoJSONComponent = ({ feature }: GeoJSONProps) => {
  const [latLng, setLatLng] = useState<LatLng>(new LatLng(feature.point.lat, feature.point.lng))

  const geoJSONSettings = useStore(state => state.geoJSONSettings)

  const createStyles = (settings: { color: string } & GeoJSONSettings): PathOptions => ({
    weight: 1,
    dashArray: '0',
    fillColor: settings.color,
    color: settings.borderColor,
    fillOpacity: settings.opacity,
    opacity: settings.borderOpacity,
  })

  return (
    <GeoJSON
      data={feature}
      onEachFeature={(f, l) => l.on("click", (e) => setLatLng(e.latlng))}
      style={createStyles({ ...geoJSONSettings, color: feature.properties.color, })} >
      <Popup minWidth={100} closeButton={false}>
        <GeoJSONPopup latLng={latLng} feature={feature} />
      </Popup>
    </GeoJSON>
  )
}
