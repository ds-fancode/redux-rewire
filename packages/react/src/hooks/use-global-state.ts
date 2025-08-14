import {useMemo, useRef} from 'react'
import {shallowEqual, useSelector, useStore} from 'react-redux'
import {createGlobalSlice, type FCStore} from '@ds-fancode/redux-rewire-core'

export const useGlobalState: {
  // overload 1
  <
    GlobalSlice extends ReturnType<typeof createGlobalSlice>,
    SliceActions extends ReturnType<GlobalSlice>['actions'],
    SliceState extends ReturnType<GlobalSlice>['initialState'],
    ReturnState
  >(
    actionSlice: GlobalSlice
  ): [SliceState, SliceActions]
  // overload 2
  <
    GlobalSlice extends ReturnType<typeof createGlobalSlice>,
    SliceActions extends ReturnType<GlobalSlice>['actions'],
    SliceState extends ReturnType<GlobalSlice>['initialState'],
    ReturnState
  >(
    actionSlice: GlobalSlice,
    stateSelector?: (_: SliceState) => ReturnState,
    equalityFunction?: (a: ReturnState, b: ReturnState) => boolean
  ): [ReturnState, SliceActions]
} = <
  GlobalSlice extends ReturnType<typeof createGlobalSlice>,
  SliceActions extends ReturnType<GlobalSlice>['actions'],
  SliceState extends ReturnType<GlobalSlice>['initialState'],
  ReturnState
>(
  globalSlice: GlobalSlice,
  stateSelector: (_: SliceState) => ReturnState = _ => _ as any,
  equalityFunction: (
    a: ReturnState | SliceState,
    b: ReturnState | SliceState
  ) => boolean = shallowEqual
): [ReturnState | SliceState, SliceActions] => {
  const store = <FCStore>useStore()
  const {initialState, actions, key} = useRef(globalSlice(store)).current
  const state = useSelector((state: any) => {
    const sliceState = state[key] ?? initialState
    return stateSelector ? stateSelector(sliceState) : sliceState
  }, equalityFunction)
  return useMemo(() => {
    return [state, actions as any]
  }, [state, actions])
}
