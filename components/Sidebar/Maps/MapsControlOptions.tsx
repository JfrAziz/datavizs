import { useStore } from "@stores/maps";
import { Switch } from "@mantine/core";
import { ListItem } from "@components/Sidebar/Common/ListItem";

export function MapsControlOptions() {
  const showControl = useStore(state => state.showControl)
  const toggleControl = useStore.getState().toggleControl
  return (
    <ListItem title="Show Maps Control" description="Hide or show maps control, e.g zoom" >
      <Switch checked={showControl} onChange={() => toggleControl()} />
    </ListItem>
  );
}