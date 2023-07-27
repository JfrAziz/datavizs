import { type FC, useMemo, useEffect } from "react"
import { Dimension, charts } from "@/components/react/chart"
import { useVizsStore } from "@/app/datavizs/store/visz-store"
import { useDataStore } from "@/app/datavizs/store/data-store"
import {
  Select,
  ScrollArea,
  Accordion,
  MultiSelect,
  ComboboxData,
  Transition,
} from "@mantine/core"

/**
 * multi select to handle variable selection,
 * generated from dimension  data
 *
 * @param props
 * @returns
 */
const VariableInputItem: FC<{
  value: string[]
  data?: ComboboxData
  dimension: Dimension
  onChange: (value: string[]) => void
}> = ({ value, data, onChange, dimension }) => {
  const placeholder = dimension.max
    ? `pick max ${dimension.max} columns`
    : `pick columns for ${dimension.label}`

  return (
    <MultiSelect
      data={data}
      value={value}
      hidePickedOptions
      onChange={onChange}
      label={dimension.label}
      maxValues={dimension.max}
      checkIconPosition="right"
      placeholder={placeholder}
      required={dimension.required}
      withAsterisk={dimension.required}
    />
  )
}

/**
 * Chart config for handling data source and variable selection,
 * also compute the data to chart data
 *
 * @param param0
 * @returns
 */
const ChartConfigData: FC<{ chartId: string }> = ({ chartId }) => {
  const chart = useVizsStore((state) => state.visz[chartId])

  const metadata = useDataStore((state) => state.metadata)

  const dataSource = useDataStore((s) => s.dataStore[chart.source ?? ""])

  /**
   * reset the state whenever the data source is changing
   *
   * @param dataId string
   */
  const setData = (dataId: string) => {
    useVizsStore.getState().updateDataSource(chartId, dataId)

    useVizsStore.getState().updateDimension(chartId, {})
  }

  /**
   * update the dimension list for each key
   *
   * @param key
   * @param value
   */
  const setDimension = (key: string, value: string[]) => {
    useVizsStore.getState().updateDimension(chartId, {
      ...chart.dimension,
      [key]: value,
    })
  }

  /**
   * column list to show in dimension dropdown
   */
  const columns = useMemo(() => {
    if (!chart.source) return []

    const chartMetadata = metadata[chart.source]

    if (!chartMetadata) return []

    // prettier-ignore
    const selected = Object.keys(chart.dimension)
      .reduce<string[]>((prev, key) => prev.concat((chart.dimension as any)[key]), [])

    return chartMetadata.columns.map((col) => ({
      label: `${col.name} (${col.type})`,
      value: col.name,
      disabled: selected.includes(col.name),
    }))
  }, [chart.source, chart.dimension, metadata])

  /**
   * data list for showing full data in data dropdown
   */
  const data = Object.keys(metadata).map((id) => ({
    value: id,
    label: metadata[id].name,
  }))

  /**
   * compute the chart data, and memoize it
   */
  const chartDataConfig = useMemo(() => {
    if (!chart.source || !dataSource) return

    if (Object.keys(chart.dimension).length === 0) return

    try {
      return charts[chart.type].createDataConfig(
        dataSource,
        chart.dimension as any
      )
    } catch (error) {
      return
    }
  }, [chart.source, chart.dimension, chart.type, dataSource])

  /**
   * update the chart config whenever the computed data is changed
   */
  useEffect(() => {
    if (!chartDataConfig) return

    console.log(chartDataConfig)

    useVizsStore.getState().updateConfig(chartId, chartDataConfig)
  }, [chartDataConfig])

  return (
    <div className="space-y-2 mb-4">
      <Select
        label="Select your data"
        placeholder="pick value"
        data={data}
        onChange={setData}
        value={chart.source}
      />
      <Transition mounted={chart.source !== undefined} transition="fade">
        {(styles) => {
          const dims = charts[chart.type].dimensions as Record<
            string,
            Dimension
          >
          return (
            <div style={styles}>
              <div key={chart.source} className="space-y-2">
                {Object.keys(dims).map((key) => (
                  <VariableInputItem
                    key={key}
                    data={columns}
                    dimension={dims[key]}
                    value={(chart.dimension as any)[key]}
                    onChange={(value) => setDimension(key, value)}
                  />
                ))}
              </div>
            </div>
          )
        }}
      </Transition>
    </div>
  )
}

/**
 * chart config for each chart available in chart store
 *
 * @param props
 * @returns
 */
const ChartConfigItem: FC<{ chartId: string }> = ({ chartId }) => {
  const chart = useVizsStore((state) => state.visz[chartId])

  const Config = charts[chart.type].Config

  return (
    <Accordion.Item key={chartId} value={chartId}>
      <Accordion.Control>{chart.name}</Accordion.Control>
      <Accordion.Panel>
        <ChartConfigData chartId={chartId} />
        <Config
          config={chart.config as any}
          setConfig={(config: any) =>
            useVizsStore.getState().updateConfig(chartId, config)
          }
        />
      </Accordion.Panel>
    </Accordion.Item>
  )
}

/**
 * just a wrapper for chart config section
 *
 * @returns
 */
export const ChartConfig: FC = () => {
  const viszs = useVizsStore((state) => state.visz)

  const firstVisz = Object.keys(viszs)[0]

  return (
    <ScrollArea className="!flex-1">
      <Accordion defaultValue={firstVisz} variant="contained">
        {Object.keys(viszs).map((chartId) => (
          <ChartConfigItem key={chartId} chartId={chartId} />
        ))}
      </Accordion>
    </ScrollArea>
  )
}
