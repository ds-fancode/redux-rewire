import React, {useCallback, useRef} from 'react'
import {Provider, type ProviderProps} from 'react-redux'

export const RewireContext = React.createContext<{
  globalStoreInitMap: {
    [key: string]: any
  }
  setGlobalStoreInitMap: (key: string, value: any) => void
}>({
  globalStoreInitMap: {},
  setGlobalStoreInitMap: () => {}
})
export const RewireProviderComp = ({
  store,
  children,
  ...args
}: ProviderProps) => {
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

export const RewireProvider = React.memo(RewireProviderComp)
