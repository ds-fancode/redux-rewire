import type {CreateActionSliceType} from '@redux-rewire/core'

export type UseGlobalStateType = <
  ActionSlice extends ReturnType<CreateActionSliceType>,
  Store extends ReturnType<ActionSlice>,
  State extends ReturnType<ActionSlice>['initialState'],
  ReturnState
>(
  store: Store,
  stateSelector: (state: State) => ReturnState,
  equalityFn?: (left: ReturnState, right: ReturnState) => boolean
) => [string, ReturnState, ReturnType<ActionSlice>['actions']]
