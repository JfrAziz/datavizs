import { Switch } from "@mantine/core";
import { useStore } from "@geojson/store";
import { Options } from "@components/Options";

export function MapsControlOptions() {
  const showControl = useStore(state => state.showMapControls)
  const toggleControl = useStore.getState().toggleMapControls
  return (
    <Options title="Show Maps Control" description="Hide or show maps control, e.g zoom" >
      <Switch checked={showControl} onChange={() => toggleControl()} />
    </Options>
  );
}