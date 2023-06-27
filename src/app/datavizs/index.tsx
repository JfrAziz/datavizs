import type { FC } from "react";
import { MantineProvider, DataTable } from "@/components/react";
import { Button, Tabs, useMantineColorScheme } from "@mantine/core";
import { useDataStore } from "./store/data-store";

const App = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  return (
    <Button
      color="blue"
      onClick={() =>
        colorScheme === "dark"
          ? setColorScheme("light")
          : setColorScheme("dark")
      }
    >
      {colorScheme !== "dark" ? "Light" : "Dark"}
    </Button>
  );
};

const Datavizs: FC = () => {
  const data = useDataStore((state) => state.data);
  const column = useDataStore((state) => state.columns);

  return (
    <MantineProvider>
      <Tabs
        variant="pills"
        display="flex"
        defaultValue="data"
        classNames={{ root: "h-screen flex !flex-col p-1" }}
      >
        <Tabs.List>
          <Tabs.Tab value="data">Data</Tabs.Tab>
          <Tabs.Tab value="visualization">Visualization</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel
          value="visualization"
          classNames={{ panel: "flex !flex-1" }}
          className="flex overflow-hidden pt-2 border-t dark:border-gray-700 mt-2"
        >
          <div>
            <App />
          </div>
        </Tabs.Panel>

        <Tabs.Panel
          value="data"
          classNames={{ panel: "flex !flex-1" }}
          className="flex overflow-hidden border-t dark:border-gray-700 mt-2"
        >
          <div className="flex-1 flex flex-row">
            <div className="w-80"></div>
            <DataTable
              search
              _id="_id"
              title="Data table"
              columns={column}
              data={data}
              sort={(name, type) =>
                useDataStore.getState().sortColumn(name, type)
              }
              edit={(_id, data) => useDataStore.getState().updateRow(_id, data)}
              remove={(type, data) => {
                if (type === "row") useDataStore.getState().deleteRows(data);
                if (type === "column")
                  useDataStore.getState().deleteColumns(data);
              }}
              createRow={() => useDataStore.getState().addRow()}
              createColumn={(column) => {
                useDataStore.getState().addColumn(column);
              }}
            />
          </div>
        </Tabs.Panel>
      </Tabs>
    </MantineProvider>
  );
};

export default Datavizs;
