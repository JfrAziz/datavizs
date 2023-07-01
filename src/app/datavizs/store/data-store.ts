import { create } from "zustand"
import { omit } from "@/utils/omit"
import { sort } from "@/utils/sort"
import { immer } from "zustand/middleware/immer"
import { generateId } from "@/utils/id-generator"
import { createData, createMetadata } from "./dummy"

/**
 * default column identifier on each object, this value will be generated
 * using nanoid(10)
 */
export const COLUMN_ID = "_id"

/**
 * initial value for DataStore
 */
const initialState: DataState = {
  metadata: {},
  dataStore: {},
}

/**
 * Zustand Data Store with immer middleware
 */
export const useDataStore = create(
  immer<DataState & DataAction>((set, get) => ({
    ...initialState,
    /**
     * get data from datastore
     *
     * @param dataId
     * @returns
     */
    getData: (dataId) => get().dataStore[dataId],
    /**
     * create a dummy data
     */
    createData: () => {
      const id = generateId()
      set((state) => {
        state.dataStore[id] = createData()
        state.metadata[id] = createMetadata()
      })
    },
    addData: (data) => {
      console.log("Not Implemented")
    },
    deleteData: (dataId) =>
      set((state) => {
        state.metadata = omit(state.metadata, dataId)
        state.dataStore = omit(state.dataStore, dataId)
      }),
    /**
     * add a column to data and metadata
     *
     * @param dataId
     * @param column
     */
    addColumn: (dataId, column) => {
      set((state) => {
        state.metadata[dataId].columns.push(column)
        state.dataStore[dataId].forEach((item) => {
          item[column.name] = item[column.name] ?? null
        })
      })
    },
    /**
     *
     * @param dataId
     * @param names
     * @returns
     */
    deleteColumns: (dataId, names) =>
      set((state) => {
        state.metadata[dataId].columns = state.metadata[dataId].columns.filter(
          (item) => !names.includes(item.name)
        )
        state.dataStore[dataId] = state.dataStore[dataId].map((item) =>
          omit(item, names)
        )
      }),
    /**
     *
     * @param dataId
     * @param name
     * @param type
     * @returns
     */
    sortColumn: (dataId, name, type) =>
      set((state) => {
        const column = state.metadata[dataId].columns.find(
          (item) => item.name === name
        )
        state.dataStore[dataId].sort((a, b) =>
          sort(a[name], b[name], column?.type, type === "desc")
        )
      }),
    /**
     *
     * @param dataId
     * @returns
     */
    addRow: (dataId) =>
      set((state) => {
        state.dataStore[dataId].push({ [COLUMN_ID]: generateId() })
      }),
    /**
     *
     * @param dataId
     * @param _ids
     * @returns
     */
    deleteRow: (dataId, _ids) =>
      set((state) => {
        state.dataStore[dataId] = state.dataStore[dataId].filter(
          (item) => !_ids.includes(item._id)
        )
      }),
    /**
     *
     * @param dataId
     * @param _id
     * @param data
     * @returns
     */
    updateRow: (dataId, _id, data) =>
      set((state) => {
        state.dataStore[dataId] = state.dataStore[dataId].map((item) =>
          item._id !== _id ? item : data
        )
      }),
  }))
)
