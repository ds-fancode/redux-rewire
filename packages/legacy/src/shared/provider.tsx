import {Provider, type ProviderProps} from 'react-redux'
import React, {useCallback, useRef} from 'react'

export const RewireContext = React.createContext<{
  globalStoreInitMap: {
    [key: string]: any
  }
  setGlobalStoreInitMap: (key: string, value: any) => void
}>({
  globalStoreInitMap: {},
  setGlobalStoreInitMap: () => {}
})
export const RewireProvider = React.memo(
  ({store, children, ...args}: ProviderProps) => {
    const {current: globalStoreInitMap} = useRef<{[key: string]: any}>({})
    const setGlobalStoreInitMap = useCallback((key: string, value: boolean) => {
      globalStoreInitMap[key] = value
    }, [])
    return (
      <RewireContext.Provider
        value={{
          globalStoreInitMap,
          setGlobalStoreInitMap
        }}
      >
        <Provider store={store} {...args}>
          {children}
        </Provider>
      </RewireContext.Provider>
    )
  }
)
