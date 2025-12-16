import {createGlobalSlice, shallowEqual} from '@ds-fancode/redux-rewire-core'
import {useContext, useMemo, useState} from 'react'
import {RewireContext} from '../core/Provider'
import {useRewireSelector} from './useSelector'

export const useGlobalState: {
  // overload 1
  <
    GlobalSlice extends ReturnType<typeof createGlobalSlice>,
    GlobalSliceInit extends GlobalSlice['init'],
    SliceActions extends ReturnType<GlobalSliceInit>['actions'],
    SliceState extends ReturnType<GlobalSliceInit>['initialState']
  >(
    actionSlice: GlobalSlice
  ): [string, SliceState, SliceActions]
  // overload 2
  <
    GlobalSlice extends ReturnType<typeof createGlobalSlice>,
    GlobalSliceInit extends GlobalSlice['init'],
    SliceActions extends ReturnType<GlobalSliceInit>['actions'],
    SliceState extends ReturnType<GlobalSliceInit>['initialState'],
    ReturnState
  >(
    actionSlice: GlobalSlice,
    stateSelector?: (_: SliceState) => ReturnState,
    equalityFunction?: (a: ReturnState, b: ReturnState) => boolean
  ): [string, ReturnState, SliceActions]
} = <
  GlobalSlice extends ReturnType<typeof createGlobalSlice>,
  GlobalSliceInit extends GlobalSlice['init'],
  SliceActions extends ReturnType<GlobalSliceInit>['actions'],
  SliceState extends ReturnType<GlobalSliceInit>['initialState'],
  ReturnState
>(
  globalSlice: GlobalSlice,
  stateSelector: (_: SliceState) => ReturnState = _ => _ as any,
  equalityFunction: (
    a: ReturnState | SliceState,
    b: ReturnState | SliceState
  ) => boolean = shallowEqual
): [string, ReturnState | SliceState, SliceActions] => {
  const {store} = useContext(RewireContext)
  const [slice] = useState(() => globalSlice.init(store))

  const state = useRewireSelector(
    slice.key,
    stateSelector,
    slice.initialState,
    equalityFunction
  )

  return useMemo(() => {
    return [slice.key, state, slice.actions as any]
  }, [slice.key, state, slice.actions])
}
