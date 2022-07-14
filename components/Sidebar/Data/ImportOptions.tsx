import { ListItem } from "@components/Sidebar/Common/ListItem";
import { ImportGeoJSONBtn } from "@components/Modals/ImportGeoJSONModal";

export function ImportOptions() {
  return (
    <ListItem title="Import Data" description="Import geojson">
      <ImportGeoJSONBtn />
    </ListItem>
  );
}