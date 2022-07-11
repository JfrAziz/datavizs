import { useContext } from "react";
import { MapSettingsContext } from "../Context/MapSettingsContext";
import { ListItem } from "../Sidebar/ListItem";
import { Switcher } from "../Sidebar/Switcher";


export function MapsControlOptions() {
  const { showControl, toggleControl } = useContext(MapSettingsContext)
  return (
    <ListItem title="Show Maps Control" description="Hide or show maps control, e.g zoom" >
      <Switcher checked={showControl} onChange={() => toggleControl()} />
    </ListItem>
  );
}