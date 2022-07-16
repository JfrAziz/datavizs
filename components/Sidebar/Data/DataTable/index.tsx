import { Row, Row2 } from './TableRow';
import { useGeoJSONStore } from "@store/geoJSONStore";
import { ScrollArea, Table } from '@mantine/core';
import { useDebounce } from '@utils/debounce';
import { Th } from './TableHead';

export const DataTable = () => {
  const mapKey = useGeoJSONStore(state => state.mapKey)
  const features = useGeoJSONStore(state => state.features)

  // const updateFeatureColor = useDebounce(useGeoJSONStore(state => state.updateFeatureColor), 500)
  // const updateFeatureByUUID = useDebounce(useGeoJSONStore(state => state.updateFeatureByUUID), 500)
  if (!features?.length) return null;

  const keys = features[0].properties && Object.keys(features[0].properties).filter(item => item !== "uuid")

  return (
    <Table key={mapKey}>
      <thead>
        <tr>
          {keys && keys.map(key => <Th key={key}>{key}</Th>)}
          <Th>color</Th>
          <Th>actions</Th>
        </tr>
      </thead>
      <tbody>
        {/* {features.map((feature) => <Row updateRow={updateFeatureByUUID} updateRowColor={updateFeatureColor} key={feature?.properties.uuid} keys={keys} properties={feature.properties} />)} */}
        {features.map((feature) => <Row2 key={feature?.properties.uuid} keys={keys} properties={feature.properties} />)}
      </tbody>
    </Table>
  )
}