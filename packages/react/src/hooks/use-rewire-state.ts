import {useMemo, useRef} from 'react'
import {shallowEqual, useSelector, useStore} from 'react-redux'
import type {FCStore} from '@redux-rewire/core'
import {createActionSlice} from '@redux-rewire/core'

export const useRewireState = <
  ActionSlice extends ReturnType<typeof createActionSlice>,
  SliceActions extends ReturnType<ActionSlice>['actions'],
  SliceState extends ReturnType<ActionSlice>['initialState'],
  ReturnState,
  Key extends string
>(
  key: Key,
  actionSlice: ActionSlice,
  stateSelector: (_: SliceState) => ReturnState = (_: any) => _,
  equalityFn = shallowEqual
): [
  Key,
  typeof stateSelector extends (...args: any[]) => void
    ? ReturnType<typeof stateSelector>
    : SliceState,
  SliceActions
] => {
  const store = <FCStore>useStore()
  const {initialState, actions} = useRef(actionSlice(key, store)).current
  const state = useSelector((state: any) => {
    const sliceState = state[key] ?? initialState
    return stateSelector ? stateSelector(sliceState) : sliceState
  }, equalityFn)
  return useMemo(() => {
    return [key, state, actions as any]
  }, [key, state, actions])
}
