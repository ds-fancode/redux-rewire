import {createActionSlice, shallowEqual} from '@ds-fancode/redux-rewire-core'
import {useContext, useMemo} from 'react'
import {RewireContext} from '../core/Provider'
import {useRewireSelector} from './useSelector'

export const useRewireState: {
  // overload 1
  <
    ActionSlice extends ReturnType<typeof createActionSlice>,
    SliceActions extends ReturnType<ActionSlice>['actions'],
    SliceState extends ReturnType<ActionSlice>['initialState'],
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
  const slice = useMemo(() => {
    return actionSlice(key, store, options?.overrideInitialState)
  }, [key])

  const state = useRewireSelector(
    slice.key,
    stateSelector,
    slice.initialState,
    shallowEqual
  )

  return useMemo(() => {
    return [slice.key as Key, state, slice.actions as any]
  }, [slice.key, state, slice.actions])
}
