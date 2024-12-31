import {useMemo, useRef} from 'react'
import {shallowEqual, useSelector, useStore} from 'react-redux'
import {createActionSlice, createSlice, type FCStore} from '@redux-rewire/core'

export const useGlobalState = <
  ActionSlice extends ReturnType<typeof createActionSlice>,
  SliceActions extends ReturnType<ActionSlice>['actions'],
  SliceState extends ReturnType<ActionSlice>['initialState'],
  SelectedState
>(
  globalSlice: ActionSlice,
  stateSelector: (state: SliceState) => SelectedState = (state: SliceState) =>
    state as any,
  equalityFn = shallowEqual
): [SelectedState, SliceActions] => {
  const store = <FCStore>useStore()
  const {initialState, actions, key} = useRef(
    createSlice('key', globalSlice, store)
  ).current
  const state = useSelector(
    (state: any) => stateSelector(state[key] ?? initialState),
    equalityFn
  )
  return useMemo(() => {
    return [state, actions as any]
  }, [state, actions])
}
