import { useEffect, useState } from "react"
import type { PropsWithChildren, ReactElement } from "react"
import type { Mutate, StoreApi, UseBoundStore } from "zustand"

export type ZustandPersistedStore = UseBoundStore<
  Mutate<StoreApi<unknown>, [["zustand/persist", unknown]]>
>

/**
 * hooks to check if the value from persisted storage has been hydrated to zustand store
 *
 * @param store StoreWithPersistMiddleware
 * @returns
 */
const useHydration = (store: ZustandPersistedStore) => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsubFinishHydration = store.persist.onFinishHydration(() =>
      setHydrated(true)
    )

    setHydrated(store.persist.hasHydrated())

    return unsubFinishHydration
  }, [store.persist])

  return hydrated
}

interface ZustandHydrationProps extends PropsWithChildren {
  store: ZustandPersistedStore
  loading?: ReactElement
}

/**
 * Custom loader to wait state from hydration
 *
 * @param param
 * @returns
 */
export const ZustandHydration = ({
  store,
  loading,
  children,
}: ZustandHydrationProps) => {
  const hydrated = useHydration(store)

  if (!hydrated) return loading ? <>{loading}</> : null

  return <>{children}</>
}
