import { useEffect, useState } from "react"
import { Mutate, StoreApi, UseBoundStore } from "zustand"

export type StoreWithPersistMiddleware = UseBoundStore<Mutate<StoreApi<unknown>, [["zustand/persist", unknown]]>>

/**
 * hooks to check if the value from persisted storage has been hydrated to zustand store
 * 
 * @param store StoreWithPersistMiddleware
 * @returns 
 */
export const useHydration = (store: StoreWithPersistMiddleware) => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsubFinishHydration = store.persist.onFinishHydration(() => setHydrated(true))

    setHydrated(store.persist.hasHydrated())

    return unsubFinishHydration
  }, [store.persist])

  return hydrated
}