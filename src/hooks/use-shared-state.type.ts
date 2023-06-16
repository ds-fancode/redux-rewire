import {CreateActionSliceType} from '../core/create-action-slice-type'

export type UseSharedStateType = <
  ActionSlice extends ReturnType<CreateActionSliceType>,
  State extends ReturnType<ActionSlice>['initialState'],
  ReturnState
>(
  sharedKey: string,
  actionSlice: {
    partialKey: string
    actionSlice: ActionSlice
    autoMount: boolean
  },
  stateSelector: (state: State) => ReturnState,
  commonKey?: string,
  equalityFn?: (left: ReturnState, right: ReturnState) => boolean
) => [string, ReturnState, ReturnType<ActionSlice>['actions']]
