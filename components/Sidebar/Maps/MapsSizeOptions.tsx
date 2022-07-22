import { useStore } from "@stores/maps";
import { NumberInput, Select } from "@mantine/core";
import { BaseList, ListItem } from "@components/Sidebar/Common/ListItem";
import { DEFAULT_MAPS_HEIGHT, DEFAULT_MAPS_WIDTH } from "@config/maps";

export function MapsSizeOptions() {
  const mapWrapper = useStore(state => state.mapWrapper)
  const setMapWrapper = useStore.getState().setMapWrapper

  return (
    <>
      <ListItem title="Maps Size" description="Set width and height of maps" >
        <Select
          value={mapWrapper.type}
          defaultValue="auto"
          data={["auto", "custom"]}
          onChange={type => setMapWrapper({ type: type as "custom" | "auto" })} />
      </ListItem>
      {mapWrapper.type === "custom" && (
        <BaseList>
          <NumberInput
            label="width"
            placeholder="800px"
            min={400} max={5000}
            value={mapWrapper.width}
            defaultValue={DEFAULT_MAPS_WIDTH}
            onChange={value => setMapWrapper({ ...mapWrapper, width: value })} />
          <NumberInput
            label="height"
            placeholder="600px"
            min={400} max={5000}
            value={mapWrapper.height}
            defaultValue={DEFAULT_MAPS_HEIGHT}
            onChange={value => setMapWrapper({ ...mapWrapper, height: value })} />
        </BaseList>
      )}
    </>
  );
}