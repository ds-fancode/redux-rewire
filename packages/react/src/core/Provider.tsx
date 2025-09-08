import React, {createContext, type ReactNode, useMemo} from 'react'
import type {FCStore} from '@ds-fancode/redux-rewire-core'

export const RewireContext = createContext<{store: FCStore}>(null as any)

export const RewireProvider = React.memo(
  ({store, children}: {store: FCStore; children: ReactNode}) => {
    const value = useMemo(() => {
      return {
        store
      }
    }, [store])
    return (
      <RewireContext.Provider value={value}>{children}</RewireContext.Provider>
    )
  }
)
