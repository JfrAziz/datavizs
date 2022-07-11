import { useId } from "@mantine/hooks";
import { useContext } from "react";
import { TileLayer } from "react-leaflet";
import { BaseMapContext } from "../Context/BaseMapContext";

const BaseMap = () => {
  const { baseMap } = useContext(BaseMapContext)
  return (
    <>
      {
        baseMap && (
          <TileLayer
            key={useId(baseMap.name)}
            attribution={baseMap.attribution}
            url={baseMap.baseMap}
          />
        )
      }
    </>
  );
};

export default BaseMap;