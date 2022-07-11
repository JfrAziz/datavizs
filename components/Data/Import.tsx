import { ListItem } from "../Sidebar/ListItem";
import { ImportGeoJSONBtn } from "../Modals/ImportGeoJSONBtn";

export function Import() {
  return (
    <ListItem title="Import Data" description="Import geojson">
      <ImportGeoJSONBtn />
    </ListItem>
  );
}