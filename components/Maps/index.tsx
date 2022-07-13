import "leaflet/dist/leaflet.css";
import { BaseMap } from "./BaseMap";
import { MapControl } from "./MapsControl";
import { FeatureGroup, MapContainer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { GeoJSONSingleObject, Square } from "./Test";
import { useContext, useEffect, useRef, useState } from "react";
import L, { LatLngBounds, LatLngTuple } from 'leaflet'
import { GeoJSONContext } from "../Context/GeoJSONContext";
// import { GeoJSONLayer } from "./GeoJSONLayer";

const SquareGroup = () => {
  const [first, setfirst] = useState<LatLngTuple>([18, 18])
  const [second, setsecond] = useState<LatLngTuple>([19, 19])
  const [third, setthird] = useState<LatLngTuple>([20, 20])
  const { geoJSON, key } = useContext(GeoJSONContext)

  const geojsonRef = useRef<L.FeatureGroup>(null)

  const map = useMap()
  // useMapEvents({
  //   click() {
  //     // setfirst([first[0] * Math.random(), first[1] * Math.random()])
  //     setsecond([second[0] * 10 * Math.random(), second[1] * 10 * Math.random()])
  //     // setthird([third[0] * Math.random(), third[1] * Math.random()])
  //     // map.fitBounds(geojsonRef.current?.getBounds() as LatLngBounds)
  //   }
  // })

  // useEffect(() => {
  //   console.log("effect geoJSON")
  //   map.fitBounds(geojsonRef.current?.getBounds() as LatLngBounds)
  // }, [])

  return (
    <FeatureGroup ref={geojsonRef} key={key}>
      {
        geoJSON && geoJSON.features && geoJSON.features.map((item) => <GeoJSONSingleObject key={item.properties?.name} data={item} />)
      }
    </FeatureGroup>
  )
}

const Map = () => {
  return (
    <>
      <MapContainer
        zoom={3}
        center={[0, 0]}
        zoomControl={false}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <MapControl />
        <BaseMap />
        {/* <GeoJSONLayer /> */}
        <SquareGroup />
      </MapContainer>
    </>
  )
}

export default Map;