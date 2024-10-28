import {Provider, ProviderProps} from 'react-redux'
import React, {useCallback, useMemo, useRef} from 'react'

export const RewireContext = React.createContext<{
  globalStoreInitMap: {
    [key: string]: any
  }
  setGlobalStoreInitMap: (key: string, value: any) => void
}>({
  globalStoreInitMap: {},
  setGlobalStoreInitMap: () => {}
})
const RewireProviderView = (props: ProviderProps) => {
  const {store, children, ...args} = props
  const {current: globalStoreInitMap} = useRef<{[key: string]: any}>({})
  const setGlobalStoreInitMap = useCallback((key: string, value: boolean) => {
    globalStoreInitMap[key] = value
  }, [])
  const value = useMemo(() => {
    return {
      globalStoreInitMap,
      setGlobalStoreInitMap
    }
  }, [globalStoreInitMap, setGlobalStoreInitMap])
  return (
    <RewireContext.Provider value={value}>
      <Provider store={store} {...args}>
        {children}
      </Provider>
    </RewireContext.Provider>
  )
}

export const RewireProvider = React.memo(RewireProviderView)
