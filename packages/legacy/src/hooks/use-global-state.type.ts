import {
  ActionType,
  ActionInputMap,
  ActionGetKeyType
} from '../core/create-action-slice-type'
import {
  ReducerGetKeyType,
  ReducerInputMap
} from '../core/create-reducer-slice-type'

export type UseReduxStateType = <
  State,
  T extends ReducerGetKeyType<State, ReducerInputMap<State>>,
  U extends ActionInputMap<
    ReturnType<T>['initialState'],
    ReturnType<T>['reducerActions'] & ActionType<State, U>
  >,
  ReturnState
>(
  actionSlice: {
    key: string
    actionSlice: ActionGetKeyType<State, T, U>
    isMounted: boolean
    autoMount: boolean
    actionsRef: any
  },
  stateSelector: (state: ReturnType<T>['initialState']) => ReturnState,
  equalityFn?: (left: ReturnState, right: ReturnState) => boolean
) => [
  string,
  ReturnState,
  ReturnType<T>['reducerActions'] & ActionType<ReturnType<T>['initialState'], U>
]
