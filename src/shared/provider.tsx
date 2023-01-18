import {Provider, ProviderProps} from 'react-redux'
import React, {useCallback, useRef} from 'react'

export const RewireContext = React.createContext<{
  globalStoreInitMap: {
    [key: string]: boolean
  }
  setGlobalStoreInitMap: (key: string) => void
}>({globalStoreInitMap: {}, setGlobalStoreInitMap: () => {}})
export const RewireProvider = ({store, children, ...args}: ProviderProps) => {
  const {current: globalStoreInitMap} = useRef<{[key: string]: boolean}>({})
  const setGlobalStoreInitMap = useCallback((key: string) => {
    globalStoreInitMap[key] = true
  }, [])
  return (
    <RewireContext.Provider
      value={{
        globalStoreInitMap,
        setGlobalStoreInitMap,
      }}
    >
      <Provider store={store} {...args}>
        {children}
      </Provider>
      ;
    </RewireContext.Provider>
  )
}
