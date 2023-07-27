import type { charts } from "."
import type { ColumnType } from "@/app/datavizs/types"
import type { ComponentPropsWithoutRef, FunctionComponent } from "react"

/**
 * subset of column type
 */
type dataType = Exclude<ColumnType, "id">

/**
 * handle dimension from data dynamically
 */
export interface Dimension {
  max?: number
  label?: string
  accept: dataType[]
  required: boolean
}

/**
 * object of dimensions
 */
export type Dimensions<T extends string> = Record<T, Dimension>

/**
 * Chart config to storing all components
 */
export interface Chart<P, D extends string> {
  /**
   * Dimension to be used to transform the data
   */
  dimensions: Dimensions<D>

  /**
   * mapper or transfomer function from data to required data
   *
   * @param data
   * @returns
   */
  createDataConfig: (
    data: Record<string, any>[],
    args: Record<D, string[]>
  ) => Partial<P>

  /**
   * transform generic theme input to different chart config
   *
   * @returns
   */
  createThemeConfig: () => Partial<P>

  /**
   * default config when creating a new chart and for comparing
   * when creating shareable link
   */
  defaultConfig: Partial<P>

  /**
   * React Chart component
   */
  Component: FunctionComponent<P>

  /**
   *  Config components for charts
   *
   */
  Config: FunctionComponent<{
    config: P

    setConfig: (config: Partial<P>) => void
  }>
}

/**
 * handle chart type dunamically from charts variable
 */
export type ChartType = keyof typeof charts

// prettier-ignore
export type ChartComponent<T extends ChartType> = (typeof charts)[T]["Component"]

// prettier-ignore
export type ChartComponentProps<T extends ChartType> = ComponentPropsWithoutRef<ChartComponent<T>>

// prettier-ignore
export type ChartConfig<T extends ChartType> = (typeof charts)[T]["Config"]

// prettier-ignore
export type ChartConfigProps<T extends ChartType> = ComponentPropsWithoutRef<ChartConfig<T>>

// prettier-ignore
export type ChartTransfomer<T extends ChartType> = (typeof charts)[T]["createDataConfig"]

// prettier-ignore
export type ChartDimensionValue<T extends ChartType> = Record<keyof(typeof charts)[T]["dimensions"], string[]>
