import { createContext, useState } from "react";
import { BaseMap, baseMaps } from "@config/baseMaps";

interface BaseMapContextValue {
  baseMap: BaseMap | null;
  setBaseMap: (value: BaseMap | null) => void
}

const baseMapInitialState: BaseMapContextValue = {
  baseMap: baseMaps[0],
  setBaseMap: (value: BaseMap | null) => { }
}

export const BaseMapContext = createContext<BaseMapContextValue>(baseMapInitialState)

export function BaseMapProvider(props: React.PropsWithChildren) {
  const [baseMap, setBaseMap] = useState<BaseMap | null>(baseMapInitialState.baseMap)

  return (
    <BaseMapContext.Provider value={{ baseMap, setBaseMap: setBaseMap }}>
      {props.children}
    </BaseMapContext.Provider>
  )
}