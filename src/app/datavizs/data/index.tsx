import { DataTable } from "@/components/react";
import type { FC } from "react";
import { useStore } from "../store/data-store";

export const Data: FC<{ dataId: string }> = ({ dataId }) => {
  const data = useStore((state) => state.dataStore[dataId]);

  const metadata = useStore((state) => state.metadata[dataId]);

  if (data === undefined || metadata === undefined) return null;

  return (
    <DataTable
      search
      _id="_id"
      data={data}
      title={metadata.name}
      columns={metadata.columns}
      createRow={() => useStore.getState().addRow(dataId)}
      edit={(_id, data) => useStore.getState().updateRow(dataId, _id, data)}
      createColumn={(column) => useStore.getState().addColumn(dataId, column)}
      sort={(name, type) => useStore.getState().sortColumn(dataId, name, type)}
      remove={(type, data) => {
        if (type === "row") useStore.getState().deleteRow(dataId, data);
        if (type === "column") useStore.getState().deleteColumns(dataId, data);
      }}
    />
  );
};
