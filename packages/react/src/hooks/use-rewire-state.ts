import {useMemo, useRef} from 'react'
import {shallowEqual, useSelector, useStore} from 'react-redux'
import type {FCStore} from '@redux-rewire/core'
import {createActionSlice} from '@redux-rewire/core'

export const useRewireState: {
  // overload 1
  <
    ActionSlice extends ReturnType<typeof createActionSlice>,
    SliceActions extends ReturnType<ActionSlice>['actions'],
    SliceState extends ReturnType<ActionSlice>['initialState'],
    ReturnState,
    Key extends string
  >(
    key: Key,
    actionSlice: ActionSlice
  ): [Key, SliceState, SliceActions]
  // overload 2
  <
    ActionSlice extends ReturnType<typeof createActionSlice>,
    SliceActions extends ReturnType<ActionSlice>['actions'],
    SliceState extends ReturnType<ActionSlice>['initialState'],
    ReturnState,
    Key extends string
  >(
    key: Key,
    actionSlice: ActionSlice,
    stateSelector?: (_: SliceState) => ReturnState,
    equalityFunction?: (a: ReturnState, b: ReturnState) => boolean
  ): [Key, ReturnState, SliceActions]
  // final
} = <
  ActionSlice extends ReturnType<typeof createActionSlice>,
  SliceActions extends ReturnType<ActionSlice>['actions'],
  SliceState extends ReturnType<ActionSlice>['initialState'],
  ReturnState,
  Key extends string
>(
  key: Key,
  actionSlice: ActionSlice,
  stateSelector: (_: SliceState) => ReturnState = _ => _ as any,
  equalityFunction: (
    a: ReturnState | SliceState,
    b: ReturnState | SliceState
  ) => boolean = shallowEqual
): [Key, ReturnState | SliceState, SliceActions] => {
  const store = <FCStore>useStore()
  const {initialState, actions} = useRef(actionSlice(key, store)).current
  const state = useSelector((state: any) => {
    const sliceState = state[key] ?? initialState
    return stateSelector ? stateSelector(sliceState) : sliceState
  }, equalityFunction)
  return useMemo(() => {
    return [key, state, actions as any]
  }, [key, state, actions])
}
