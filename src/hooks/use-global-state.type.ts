import {CreateActionSliceType} from '../core/create-action-slice-type'

export type UseReduxStateType = <
  ActionSlice extends ReturnType<CreateActionSliceType>,
  State extends ReturnType<ActionSlice>['initialState'],
  ReturnState
>(
  actionSlice: {
    key: string
    actionSlice: ActionSlice
    autoMount: boolean
  },
  stateSelector: (state: State) => ReturnState,
  equalityFn?: (left: ReturnState, right: ReturnState) => boolean
) => [string, ReturnState, ReturnType<ActionSlice>['actions']]
