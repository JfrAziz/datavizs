import { ListItem } from "@components/Sidebar/Common/ListItem";
import { Switcher } from "@components/Sidebar/Common/Switcher";
import { useMapSettingsStore } from "@store/mapSettingsStore";

export function MapsControlOptions() {
  const showControl = useMapSettingsStore(state => state.showControl)
  const toggleControl = useMapSettingsStore(state => state.toggleControl)
  return (
    <ListItem title="Show Maps Control" description="Hide or show maps control, e.g zoom" >
      <Switcher checked={showControl} onChange={() => toggleControl()} />
    </ListItem>
  );
}