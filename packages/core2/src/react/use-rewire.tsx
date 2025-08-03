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
  SliceActions extends ReturnType<ActionSlice['addToStore']>['actions']
>(
  key: Key,
  slice: ActionSlice
): [Key, any, SliceActions] => {
  const store = useContext(RewireContext)
  const [{actions, unsubscribe}] = useState(slice.addToStore(key, store))
  const [state, setState] = useState(slice.initialState)

  useEffect(() => {
    return () => {
      unsubscribe()
    }
  }, [key, slice])

  return useMemo(() => [key, state, actions] as any, [key, state, actions])
}
