import type { PieSvgProps } from "@nivo/pie";
import type { FC } from "react";

interface ConfigProps {
  config: PieSvgProps<any>

  setConfig: (config: PieSvgProps<any>) => void
}
export const PieConfig: FC<ConfigProps> = ({ config, setConfig }) => {
  return (
    <div></div>
  )
}