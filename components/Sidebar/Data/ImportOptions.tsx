import { ListItem } from "../Items/ListItem";
import { ImportGeoJSONBtn } from "../../Modals/ImportModal";

export function ImportOptions() {
  return (
    <ListItem title="Import Data" description="Import geojson">
      <ImportGeoJSONBtn />
    </ListItem>
  );
}