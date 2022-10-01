import { PropsWithChildren } from "react";
import { createStyles, Group, Loader } from "@mantine/core";
import { StoreWithPersistMiddleware, useHydration } from "@lib/hooks/hydration";

const useStyles = createStyles({
  wrapper: {
    position: "absolute",
    zIndex: 100,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});


interface ZustandHydrationProps extends PropsWithChildren {
  store: StoreWithPersistMiddleware
}

/**
 * Custom loader to wait state from hydration
 * 
 * @param param 
 * @returns 
 */
export const ZustandHydration = ({ store, children }: ZustandHydrationProps) => {
  const hydrated = useHydration(store)

  const { classes } = useStyles()

  if (!hydrated) return (
    <Group position="center" className={classes.wrapper}>
      <Loader variant="bars" />
    </Group>
  );

  return <>{children}</>
}