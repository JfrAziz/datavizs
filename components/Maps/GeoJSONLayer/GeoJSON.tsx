import { FC } from "react";
import { Feature } from 'geojson';
import { Popup } from "react-leaflet";
import { GeoJSONPopup } from "./GeoJSONPopup";
import { GeoJSONComponent } from "./GeoJSONComponent";

export const GeoJSON: FC<{ feature: Feature }> = ({ feature }) => (
  <GeoJSONComponent data={feature}>
    <Popup minWidth={100} closeButton={false}>
      <GeoJSONPopup properties={feature.properties} />
    </Popup>
  </GeoJSONComponent>
)