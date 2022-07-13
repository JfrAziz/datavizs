import { ListItem } from "../Sidebar/ListItem";
import { ImportGeoJSONBtn } from "../Modals/ImportGeoJSONBtn";
import { useContext } from "react";
import { GeoJSONContext } from "../Context/GeoJSONContext";
import { Button } from "@mantine/core";

export function Import() {
  const { updateGeoJSON } = useContext(GeoJSONContext)
  return (
    <>
      <ListItem title="Import Data" description="Import geojson">
        <ImportGeoJSONBtn />
      </ListItem>
      <ListItem title="Delete Data" description="Import geojson">
        <Button onClick={() => updateGeoJSON(1)} >Delete</Button>
      </ListItem>
    </>
  );
}