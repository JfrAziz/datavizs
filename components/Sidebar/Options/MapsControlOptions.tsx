import { useContext } from "react";
import { MapSettingsContext } from "../../Context/MapSettingsContext";
import { ListItem } from "../Items/ListItem";
import { Switcher } from "../Items/Switcher";

export function MapsControlOptions() {
  const { showControl, toggleControl } = useContext(MapSettingsContext)
  return (
    <ListItem title="Show Maps Control" description="Hide or show maps control, e.g zoom" >
      <Switcher checked={showControl} onChange={() => toggleControl()} />
    </ListItem>
  );
}