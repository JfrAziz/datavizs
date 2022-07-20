import { useStore } from "@stores/maps";
import { ListItem } from "@components/Sidebar/Common/ListItem";
import { Switcher } from "@components/Sidebar/Common/Switcher";

export function MapsControlOptions() {
  const showControl = useStore(state => state.showControl)
  const toggleControl = useStore.getState().toggleControl
  return (
    <ListItem title="Show Maps Control" description="Hide or show maps control, e.g zoom" >
      <Switcher checked={showControl} onChange={() => toggleControl()} />
    </ListItem>
  );
}