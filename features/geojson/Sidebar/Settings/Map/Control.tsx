import { Switch } from "@mantine/core";
import { useStore } from "@geojson/store";
import { Settings } from "@components/Settings";

export function MapControlSettings() {
  const showControl = useStore(state => state.showMapControls)
  const toggleControl = useStore.getState().toggleMapControls
  return (
    <Settings title="Show Maps Control" description="Hide or show maps control, e.g zoom" >
      <Switch checked={showControl} onChange={() => toggleControl()} />
    </Settings>
  );
}