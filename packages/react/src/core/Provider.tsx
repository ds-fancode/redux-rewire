import type {FCStore} from '@ds-fancode/redux-rewire-core'
import React, {createContext, type ReactNode, useMemo} from 'react'

export const RewireContext = createContext<{store: FCStore}>(null as any)

const RewireProviderComp = ({
  store,
  children
}: {
  store: FCStore
  children: ReactNode
}) => {
  const value = useMemo(() => {
    return {
      store
    }
  }, [store])
  return (
    <RewireContext.Provider value={value}>{children}</RewireContext.Provider>
  )
}

export const RewireProvider = React.memo(RewireProviderComp)
