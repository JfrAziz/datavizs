import { ListItem } from "@components/Sidebar/Common/ListItem";
import { Switcher } from "@components/Sidebar/Common/Switcher";
import { useMapStore } from "@store/mapStore";

export function MapsControlOptions() {
  const showControl = useMapStore(state => state.showControl)
  const toggleControl = useMapStore.getState().toggleControl
  return (
    <ListItem title="Show Maps Control" description="Hide or show maps control, e.g zoom" >
      <Switcher checked={showControl} onChange={() => toggleControl()} />
    </ListItem>
  );
}