import type { charts } from "."
import type { ComponentProps, ComponentPropsWithoutRef, FunctionComponent } from "react"
import type { ColumnType, FlatObject } from "@/app/datavizs/types"

/**
 * subset of column type
 */
type dataType = Exclude<ColumnType, "id">

/**
 * handle dimension from data dynamically
 */
interface Dimension {
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
   * mapper or transfomer function from data to required datt
   *
   * @param data
   * @returns
   */
  transfomer: (data: FlatObject, args: Record<D, string[]>) => FlatObject

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

    setConfig: (config: P) => void
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
export type ChartTransfomer<T extends ChartType> = (typeof charts)[T]["transfomer"]

// prettier-ignore
export type ChartDimensionValue<T extends ChartType> = Record<keyof(typeof charts)[T]["dimensions"], string[]>
