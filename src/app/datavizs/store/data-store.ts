import { create } from "zustand";
import { omit } from "@/utils/omit";
import { sort } from "@/utils/sort";
import { faker } from "@faker-js/faker";
import { generateId } from "@/utils/id-generator";

type ColumnType = "string" | "number" | "id";

interface Column {
  name: string;
  type: ColumnType;
}

interface DynamicObject2D {
  _id: string;
  [key: string]: any;
}

interface DataState {
  columns: Column[];
  data: DynamicObject2D[];
}

const dataStateInitialValue: DataState = {
  columns: [
    {
      name: "_id",
      type: "id",
    },
    {
      name: "name",
      type: "string",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "age",
      type: "number",
    },
    {
      name: "gender",
      type: "string",
    },
  ],
  data: faker.helpers.multiple(
    () => ({
      _id: faker.string.nanoid(10),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 10, max: 70 }),
      gender: faker.person.sex(),
    }),
    { count: 100 }
  ),
};

interface ActionState {
  getColumn: (name: string) => Column | undefined;

  addColumn: (column: Column) => void;

  deleteColumns: (names: string[]) => void;

  sortColumn: (name: string, type: "asc" | "desc") => void;

  addRow: () => void;

  deleteRows: (id: string[]) => void;

  updateRow: (id: string, data: DynamicObject2D) => void;
}

const useDataStore = create<DataState & ActionState>((set, get) => ({
  ...dataStateInitialValue,
  getColumn: (name) => get().columns.find((item) => item.name === name),
  addColumn: (column) =>
    set((state) => ({
      columns: [...state.columns, column],
      data: state.data.map((item) => ({
        ...item,
        [column.name]: item[column.name] ?? null,
      })),
    })),
  deleteColumns: (names) =>
    set((state) => ({
      data: state.data.map((item) => omit(item, names)),
      columns: state.columns.filter((col) => !names.includes(col.name)),
    })),
  sortColumn: (name, type) =>
    set((state) => ({
      data: state.data.sort((a, b) =>
        sort(a[name], b[name], get().getColumn(name)?.type, type === "desc")
      ),
    })),
  addRow: () =>
    set((state) => ({
      data: [...state.data, { _id: generateId() }],
    })),
  updateRow: (id, data) =>
    set((state) => ({
      data: state.data.map((item) => (item._id !== id ? item : { ...data })),
    })),
  deleteRows: (ids) =>
    set((state) => {
      const data = state.data.filter((item) => !ids.includes(item._id));
      return !data.length ? dataStateInitialValue : { data: data };
    }),
}));

export { useDataStore };
