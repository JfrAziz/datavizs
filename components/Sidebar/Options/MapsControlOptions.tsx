import { useContext } from "react";
import { MapSettingsContext } from "@context/MapSettingsContext";
import { ListItem } from "@components/Sidebar/Common/ListItem";
import { Switcher } from "@components/Sidebar/Common/Switcher";

export function MapsControlOptions() {
  const { showControl, toggleControl } = useContext(MapSettingsContext)
  return (
    <ListItem title="Show Maps Control" description="Hide or show maps control, e.g zoom" >
      <Switcher checked={showControl} onChange={() => toggleControl()} />
    </ListItem>
  );
}