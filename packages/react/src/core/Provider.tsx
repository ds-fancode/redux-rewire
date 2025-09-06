import React, {createContext, type ReactNode} from 'react'
import {Provider} from 'react-redux'
import type {FCStore} from '@ds-fancode/redux-rewire-core'

export const RewireContext = createContext<FCStore>(null as any)

export const RewireProvider = React.memo(
  ({store, children}: {store: FCStore; children: ReactNode}) => {
    return (
      <RewireContext.Provider value={store}>
        <Provider store={store}>{children}</Provider>
      </RewireContext.Provider>
    )
  }
)
