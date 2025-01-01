import {useMemo, useRef} from 'react'
import {shallowEqual, useSelector, useStore} from 'react-redux'
import {createGlobalSlice, type FCStore} from '@redux-rewire/core'

export const useGlobalState = <
  GlobalSlice extends ReturnType<typeof createGlobalSlice>,
  SliceActions extends ReturnType<GlobalSlice>['actions'],
  SliceState extends ReturnType<GlobalSlice>['initialState'],
  SelectedState
>(
  globalSlice: GlobalSlice,
  stateSelector: (state: SliceState) => SelectedState = (state: SliceState) =>
    state as any,
  equalityFn = shallowEqual
): [SelectedState, SliceActions] => {
  const store = <FCStore>useStore()
  const {initialState, actions, key} = useRef(globalSlice(store)).current
  const state = useSelector(
    (state: any) => stateSelector(state[key] ?? initialState),
    equalityFn
  )
  return useMemo(() => {
    return [state, actions as any]
  }, [state, actions])
}
