import type {ProviderProps} from 'react-redux'
import {Provider} from 'react-redux'
import React from 'react'

// export const RewireContext = createContext<{}>({})

export const RewireProvider = React.memo(
  ({store, children, ...args}: ProviderProps) => {
    return (
      <Provider store={store} {...args}>
        {children}
      </Provider>
    )
  }
)
