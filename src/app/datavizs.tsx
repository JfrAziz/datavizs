import "@mantine/core/styles.css";
import { useState, type FC } from "react";
import { MantineProvider, Button, ColorSchemeScript } from "@mantine/core";

const Datavizs: FC = () => {
  const [first, setfirst] = useState("");
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider>
        <div>
          <Button onClick={() => setfirst("s")}>Hallo</Button>
          {first}a
        </div>
        <div className="bg-blue-200 text-black">asdad</div>
      </MantineProvider>
    </>
  );
};

export default Datavizs;
