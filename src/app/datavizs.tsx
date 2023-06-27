import type { FC } from "react";
import { MantineProvider, DataTable } from "@/components/react";
import { Button, Tabs, useMantineColorScheme } from "@mantine/core";

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
  return (
    <MantineProvider>
      <Tabs
        variant="outline"
        display="flex"
        defaultValue="gallery"
        classNames={{ root: "h-screen flex !flex-col" }}
      >
        <Tabs.List>
          <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel
          classNames={{ panel: "flex !flex-1" }}
          className="flex overflow-hidden"
          value="gallery"
        >
          <div className="flex-1 flex flex-row">
            <div className="min-w-[200px]">
              <App />
            </div>
            <DataTable
              _id="_id"
              title="Data table"
              search
              columns={["_id", "name", "email", "age", "gender"].map(
                (item) => ({ title: item, type: "text" })
              )}
              data={Array(100).fill({
                _id: "id-1",
                name: "John Doe",
                email: "john.doe@example.com",
                age: 28,
                gender: "male",
              })}
              edit={() => console.log("Edited")}
              sort={() => console.log("sorted")}
              remove={() => console.log("Removed")}
              createRow={() => console.log("Row Created")}
              createColumn={() => console.log("Column Created")}
            />
          </div>
        </Tabs.Panel>
      </Tabs>
    </MantineProvider>
  );
};

export default Datavizs;
