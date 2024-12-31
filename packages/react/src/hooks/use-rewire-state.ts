import {useMemo, useRef} from 'react'
import {shallowEqual, useSelector, useStore} from 'react-redux'
import type {FCStore} from '@redux-rewire/core'
import {createActionSlice} from '@redux-rewire/core'

export const useRewireState = <
  ActionSlice extends ReturnType<typeof createActionSlice>,
  SliceActions extends ReturnType<ActionSlice>['actions'],
  SliceState extends ReturnType<ActionSlice>['initialState'],
  SelectedState
>(
  key: string,
  actionSlice: ActionSlice,
  stateSelector: (state: SliceState) => SelectedState = (state: SliceState) =>
    state as any,
  equalityFn = shallowEqual
): [string, SelectedState, SliceActions] => {
  const store = <FCStore>useStore()
  const {initialState, actions} = useRef(actionSlice(key, store)).current
  const state = useSelector(
    (state: any) => stateSelector(state[key] ?? initialState),
    equalityFn
  )
  return useMemo(() => {
    return [key, state, actions as any]
  }, [key, state, actions])
}
