import React from "react";
import { BaseMapProvider } from "../Context/BaseMapContext";

export function MapsProvider(props: React.PropsWithChildren) {
  return (
    <BaseMapProvider>
      {props.children}
    </BaseMapProvider>
  )
}