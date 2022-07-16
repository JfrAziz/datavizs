import { FC } from "react";
import { Popup } from "react-leaflet";
import { GeoJSONPopup } from "./GeoJSONPopup";
import { GeoJSONComponent } from "./GeoJSONComponent";
import { FeatureExtended } from "@utils/featureCollection";

export const GeoJSON: FC<{ feature: FeatureExtended }> = ({ feature }) => (
  <GeoJSONComponent data={feature}>
    <Popup minWidth={100} closeButton={false}>
      <GeoJSONPopup properties={feature.properties} />
    </Popup>
  </GeoJSONComponent>
)