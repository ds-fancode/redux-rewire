import {useContext, useMemo, useState} from 'react'
import {createActionSlice, shallowEqual} from '@ds-fancode/redux-rewire-core'
import {useSelector2} from './useSelector'
import {RewireContext} from '../core/Provider'

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
    options?: {
      overrideInitialState?: Partial<SliceState>
      equalityFunction?: (
        a: ReturnState | SliceState,
        b: ReturnState | SliceState
      ) => boolean
    }
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
  options?: {
    overrideInitialState?: Partial<SliceState>
    equalityFunction?: (
      a: ReturnState | SliceState,
      b: ReturnState | SliceState
    ) => boolean
  }
): [Key, ReturnState | SliceState, SliceActions] => {
  const {store} = useContext(RewireContext)
  const [slice] = useState(() =>
    actionSlice(key, store, options?.overrideInitialState)
  )

  // const state = useSelector((state: any) => {
  //   const sliceState = state[slice.key] ?? slice.initialState
  //   return stateSelector ? stateSelector(sliceState) : sliceState
  // }, options?.equalityFunction ?? shallowEqual)

  const state = useSelector2((state: Record<string, any>) => {
    const sliceState = state?.[slice.key] ?? slice.initialState
    return stateSelector ? stateSelector(sliceState) : sliceState
  }, shallowEqual)

  return useMemo(() => {
    return [slice.key as Key, state, slice.actions as any]
  }, [slice.key, state, slice.actions])
}
