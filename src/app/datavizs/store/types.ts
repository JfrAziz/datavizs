import type { Column, MetaData, FlatObject } from "@/app/datavizs/types"
import type {
  ChartType,
  ChartComponentProps,
  ChartDimensionValue,
} from "@/components/react/chart"

export interface DataState {
  metadata: {
    [id: string]: MetaData
  }
  dataStore: {
    [id: string]: FlatObject[]
  }
}

export interface DataAction {
  deleteData: (dataId: string[]) => void

  addData: (metadata: MetaData, data: FlatObject[]) => void

  addColumn: (dataId: string, column: Column) => void

  deleteColumns: (dataId: string, names: string[]) => void

  sortColumn: (dataId: string, name: string, type: "asc" | "desc") => void

  addRow: (dataId: string) => void

  deleteRow: (dataId: string, _ids: string[]) => void

  updateRow: (dataId: string, _id: string, data: FlatObject) => void
}

interface Vizs {
  name: string
  type: ChartType
  source?: string
  config: ChartComponentProps<Vizs["type"]>
  dimension: ChartDimensionValue<Vizs["type"]>
}

export interface VizsState {
  layouts: string[]
  visz: {
    [id: string]: Vizs
  }
}

export interface VizsAction {
  /**
   * updating the data source for the chart
   *
   * @param chartId string
   * @param dataId
   * @returns
   */
  updateDataSource: (chartId: string, dataId: string) => void
  /**
   * every chart need dimension, which is the columns from data to be used tp
   * construct the chart data
   *
   * @param chartId
   * @param dimension
   * @returns
   */
  updateDimension: (
    chartId: string,
    dimension: Record<string, string[]>
  ) => void
  /**
   * updating config files from the chart
   *
   * @param chartId
   * @param config
   * @returns
   */
  updateConfig: (
    chartId: string,
    config: Partial<ChartComponentProps<Vizs["type"]>>
  ) => void
}
