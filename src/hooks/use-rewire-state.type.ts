import {CreateActionSliceType} from '../core/create-action-slice-type'

export type UseRewireStateType = <
  ActionSlice extends ReturnType<CreateActionSliceType>,
  State extends ReturnType<ActionSlice>['initialState'],
  ReturnState
>(
  key: string,
  actionSlice: ActionSlice,
  stateSelector: (state: State) => ReturnState,
  parentKey?: string,
  equalityFn?: (left: ReturnState, right: ReturnState) => boolean,
  actionsRef?: any
) => [string, ReturnState, ReturnType<ActionSlice>['actions']]
