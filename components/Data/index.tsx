import { ListItem } from "../Sidebar/ListItem";
import { ImportGeoJSONBtn } from "../Modals/ImportGeoJSONBtn";

export function Data() {
  return (
    <div>
      <ListItem title="Import Data" description="Import geojson">
        <ImportGeoJSONBtn />
      </ListItem>
    </div>
  );
}