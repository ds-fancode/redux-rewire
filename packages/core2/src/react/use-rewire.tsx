import React, {useContext, useEffect, useMemo, useState} from 'react'
import type {createSlice} from '../slice/create-slice'

const RewireContext = React.createContext<any>(null)

export const RewireProvider = (props: any) => {
  return (
    <RewireContext.Provider value={props.store}>
      {props.children}
    </RewireContext.Provider>
  )
}
export const useRewire = <
  Key extends string,
  ActionSlice extends ReturnType<typeof createSlice>,
  SliceActions extends ReturnType<ActionSlice['addToStore']>['actions'],
  SliceState extends ReturnType<ActionSlice['addToStore']>['initialState']
>(
  key: Key,
  slice: ActionSlice,
  options?: {
    overrideInitialState?: Partial<SliceState>
  }
): [Key, any, SliceActions] => {
  const store = useContext(RewireContext)
  const [{actions, unsubscribe, initialState}] = useState(
    slice.addToStore(key, store, options)
  )
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const unsub = slice.on(updateState => {
      setState(updateState as any)
    })
    return () => {
      unsub()
      unsubscribe()
    }
  }, [key, slice])

  return useMemo(() => [key, state, actions] as any, [key, state, actions])
}
