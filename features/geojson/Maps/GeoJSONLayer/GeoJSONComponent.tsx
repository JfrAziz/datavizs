import { useState } from 'react';
import { GeoJSONPopup } from './GeoJSONPopup';
import { PathOptions, LatLng } from "leaflet";
import { Popup, GeoJSON } from "react-leaflet";
import { FeatureExtended } from '@geojson/store/types';


interface GeoJSONProps {
  feature: FeatureExtended
}

export const GeoJSONComponent = ({ feature }: GeoJSONProps) => {
  const [latLng, setLatLng] = useState<LatLng>(new LatLng(feature.point.lat, feature.point.lng))

  const createStyles = (color: string): PathOptions => ({
    weight: 1,
    opacity: 1,
    color: '#fff',
    dashArray: '0',
    fillOpacity: 1,
    fillColor: color,
  })

  return (
    <GeoJSON
      data={feature}
      style={createStyles(feature.properties.color)}
      onEachFeature={(f, l) => l.on("click", (e) => setLatLng(e.latlng))} >
      <Popup minWidth={100} closeButton={false}>
        <GeoJSONPopup latLng={latLng} feature={feature} />
      </Popup>
    </GeoJSON>
  )
}
