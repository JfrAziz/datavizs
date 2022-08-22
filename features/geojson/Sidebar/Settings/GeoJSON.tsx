import { Settings, SettingsWrapper } from "@components/Settings";
import { useStore } from "@geojson/store";
import { useDebounce } from "@lib/utils/debounce";
import { ColorInput, Group, Input, Slider, Stack } from "@mantine/core";

export const GeoJSONSettings = () => {
  const options = useStore(state => state.geoJSONSettings)

  const update = useStore.getState().updateGeoJSONSettings

  const updateWithBounce = useDebounce(useStore.getState().updateGeoJSONSettings, 300)

  return (
    <>
      <SettingsWrapper grow>
        <Input.Wrapper label="Map Opacity" size="xs">
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={options.opacity}
            labelTransition="skew-down"
            labelTransitionDuration={150}
            label={(value) => value.toFixed(2)}
            labelTransitionTimingFunction="ease"
            onChange={(value) => update({ opacity: value })}
          />
        </Input.Wrapper>
      </SettingsWrapper>
      <Group mt="lg" grow>
        <Input.Wrapper label="Border Width" size="xs">
          <Slider
            min={0}
            max={10}
            step={0.01}
            value={options.borderWidth}
            labelTransition="skew-down"
            labelTransitionDuration={150}
            label={(value) => value.toFixed(2)}
            labelTransitionTimingFunction="ease"
            onChange={(value) => update({ borderWidth: value })}
            marks={[
              { value: 0, label: '0' },
              { value: 10, label: '10' },
            ]}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Border Color" size="xs">
          <ColorInput
            value={options.borderColor}
            onChange={(color) => updateWithBounce({ borderColor: color })} />
        </Input.Wrapper>
      </Group>
    </>
  );
}