import { Switch } from "@mantine/core";
import { useStore } from "@stores/maps";
import { Options } from "@components/Common/Options";

export function MapsControlOptions() {
  const showControl = useStore(state => state.showMapControls)
  const toggleControl = useStore.getState().toggleMapControls
  return (
    <Options title="Show Maps Control" description="Hide or show maps control, e.g zoom" >
      <Switch checked={showControl} onChange={() => toggleControl()} />
    </Options>
  );
}