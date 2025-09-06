import {useMemo, useRef} from 'react'
import {shallowEqual, useSelector, useStore} from 'react-redux'
import {createActionSlice, type FCStore} from '@ds-fancode/redux-rewire-core'
// import {RewireContext} from '../core/Provider'

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
  // const store1 = useContext(RewireContext)
  const store = <FCStore>useStore()
  const {initialState, actions} = useRef(
    actionSlice(key, store, options?.overrideInitialState)
  ).current
  const state = useSelector((state: any) => {
    const sliceState = state[key] ?? initialState
    return stateSelector ? stateSelector(sliceState) : sliceState
  }, options?.equalityFunction ?? shallowEqual)
  return useMemo(() => {
    return [key, state, actions as any]
  }, [key, state, actions])
}
