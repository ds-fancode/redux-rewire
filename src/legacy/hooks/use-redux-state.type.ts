import {
  ActionType,
  ActionGetKeyType,
  ActionInputMap
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
  key: string,
  action: ActionGetKeyType<State, T, U>,
  stateSelector: (state: ReturnType<T>['initialState']) => ReturnState,
  equalityFn?: (left: ReturnState, right: ReturnState) => boolean,
  actionsRef?: any
) => [
  string,
  ReturnState,
  ReturnType<T>['reducerActions'] & ActionType<ReturnType<T>['initialState'], U>
]
