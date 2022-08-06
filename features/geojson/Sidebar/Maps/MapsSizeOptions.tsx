import { useStore } from "@geojson/store";
import { NumberInput, Select } from "@mantine/core";
import { Options, OptionWrapper } from "@components/Options";
import { DEFAULT_MAPS_HEIGHT, DEFAULT_MAPS_WIDTH, MAPS_MAX_HEIGHT, MAPS_MAX_WIDTH } from "@config/maps";

export function MapsSizeOptions() {
  const mapWrapper = useStore(state => state.mapWrapper)
  const setMapWrapper = useStore.getState().setMapWrapper

  return (
    <>
      <Options title="Maps Size" description="Set width and height of maps" >
        <Select
          value={mapWrapper.type}
          defaultValue="auto"
          data={["auto", "custom"]}
          onChange={type => setMapWrapper({ type: type as "custom" | "auto" })} />
      </Options>
      {mapWrapper.type === "custom" && (
        <OptionWrapper>
          <NumberInput
            label="width"
            placeholder="800px"
            value={mapWrapper.width}
            min={400} max={MAPS_MAX_WIDTH}
            defaultValue={DEFAULT_MAPS_WIDTH}
            onChange={value => setMapWrapper({ width: value })} />
          <NumberInput
            label="height"
            placeholder="600px"
            value={mapWrapper.height}
            min={400} max={MAPS_MAX_HEIGHT}
            defaultValue={DEFAULT_MAPS_HEIGHT}
            onChange={value => setMapWrapper({ height: value })} />
        </OptionWrapper>
      )}
    </>
  );
}