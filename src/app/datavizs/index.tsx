import { useState, type FC } from "react";
import { useStore } from "./store/data-store";
import { MantineProvider } from "@/components/react";
import {
  IconDatabase,
  IconMoon,
  IconSun,
  IconTable,
  IconTableFilled,
} from "@tabler/icons-react";
import {
  Tabs,
  Tooltip,
  Button,
  ActionIcon,
  useMantineColorScheme,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { Data } from "./data";
import clsx from "clsx";

const MantineDarkMode = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <Tooltip label="Toggle Dark Mode">
      <ActionIcon
        variant="default"
        onClick={() => setColorScheme(isDark ? "light" : "dark")}
      >
        {isDark ? (
          <IconSun className="w-4 h-4" />
        ) : (
          <IconMoon className="w-4 h-4" />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

const Datavizs: FC = () => {
  const [dataId, setDataId] = useState<string>("");

  const metadata = useStore((state) => state.metadata);

  return (
    <MantineProvider>
      <Tabs
        variant="pills"
        display="flex"
        defaultValue="data"
        classNames={{ root: "h-screen flex !flex-col p-1" }}
      >
        <Tabs.List className="flex items-center">
          <div className="flex-1 flex items-center">
            <Tabs.Tab value="data">Data</Tabs.Tab>
            <Tabs.Tab value="visualization">Visualization</Tabs.Tab>
          </div>
          <Button
            size="compact-sm"
            onClick={() => useStore.getState().createData()}
          >
            Add Dummy Data
          </Button>
          <MantineDarkMode />
        </Tabs.List>

        <Tabs.Panel
          value="visualization"
          classNames={{ panel: "flex !flex-1" }}
          className="flex overflow-hidden pt-2 border-t dark:border-gray-700 mt-2"
        >
          <div></div>
        </Tabs.Panel>

        <Tabs.Panel
          value="data"
          classNames={{ panel: "flex !flex-1" }}
          className="flex overflow-hidden border-t dark:border-gray-700 mt-2"
        >
          <div className="flex-1 flex flex-row">
            <div className="w-80 flex flex-col p-1 text-gray-700">
              <ScrollArea className="flex-1">
                {Object.keys(metadata).map((item) => (
                  <UnstyledButton
                    key={item}
                    onClick={() => setDataId(item)}
                    className="w-full"
                  >
                    <div
                      className={clsx(
                        "flex items-center hover:bg-gray-100 border-b",
                        item === dataId && "bg-gray-100"
                      )}
                    >
                      <IconTableFilled
                        strokeWidth={1}
                        className="text-gray-500 w-8 h-8"
                      />
                      <div className="flex-1 flex flex-col space-y-1 py-1 px-2 mb-1">
                        <Text size="sm" fw={600}>
                          {metadata[item].name}
                        </Text>
                        <span className="text-xs italic">
                          {metadata[item].createdAt.toDateString()}
                        </span>
                      </div>
                    </div>
                  </UnstyledButton>
                ))}
              </ScrollArea>
            </div>
            <Data dataId={dataId} />
          </div>
        </Tabs.Panel>
      </Tabs>
    </MantineProvider>
  );
};

export default Datavizs;
