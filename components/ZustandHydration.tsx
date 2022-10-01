import { PropsWithChildren } from "react";
import { Group, Loader } from "@mantine/core";
import { StoreWithPersistMiddleware, useHydration } from "@lib/hooks/hydration";

interface ZustandHydrationProps extends PropsWithChildren {
  store: StoreWithPersistMiddleware
}

export const ZustandHydration = ({ store, children }: ZustandHydrationProps) => {
  const hydrated = useHydration(store)

  if(!hydrated) return <Group position="center"><Loader variant="bars" /></Group>;

  return <>{children}</>
}