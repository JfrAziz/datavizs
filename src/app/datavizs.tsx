import "@mantine/core/styles.css";
import { useState, type FC } from "react";
import { CustomButton } from "@/components/react/Button";
import { MantineProvider, Button, ColorSchemeScript } from "@mantine/core";

const Datavizs: FC = () => {
  const [first, setfirst] = useState("");
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider>
        <div>
          <Button onClick={() => setfirst("Hallo Juga")}>Hallo</Button>
          <span>{first}</span>
        </div>
        <div className="bg-blue-200 text-black">Hallo</div>
        <CustomButton />
      </MantineProvider>
    </>
  );
};

export default Datavizs;
